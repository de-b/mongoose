const jwt = require('jsonwebtoken');
const config = require('../configs/index');
const UserModel = require('../model/user.model');

module.exports = function (req, res, next) {
  var token;
  if (req.headers['authorization']) {
    token = req.headers['authorization'];
  }
  if (req.headers['x-access-token']) {
    token = req.headers['x-access-token'];
  }
  if (req.header['token']) {
    token = req.headers['token'];
  }
  if (req.query.token) {
    token = req.query.token;
  }
  if (token) {
    jwt.verify(token, config.jwtSecret, function (err, decoded) {
      if (err) {
        return next(err);
      }
      //   console.log('decoded value is >>>>>>>', decoded);
      UserModel.findById({ _id: decoded._id }).then((user) => {
        if (user) {
          req.anyVarName = user;
          console.log('store requested varname >>>', user);
          next();
        } else {
          next({
            msg: 'user removed from system',
          });
        }
      });
    });
  } else {
    next({
      msg: 'token not provided',
      status: 400,
    });
  }
};
