const UserModel = require('./../model/user.model');

module.exports = function (req, res, next) {
  UserModel.find({ _id: req.params.id }, function (err, user) {
    if (err) {
      return next(err);
    }
    console.log('requested variable name role >>>>>>>', req.anyVarName.role);
    if (req.anyVarName.role !== 1) {
      return next({
        msg: 'the user is not admin, coming from isUserAdmin middleware',
      });
    }
    next();
  });
};
