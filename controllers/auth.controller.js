const express = require('express');
const router = express.Router();
const UserModel = require('../model/user.model');
const MapUser = require('../helpers/mapUserRequest');

const passwordHash = require('password-hash');
const config = require('../configs/index');

const jwt = require('jsonwebtoken');

//this function is using on login router where we are creating token during login
function createToken(data) {
  let token = jwt.sign(
    { _id: data.id }, // just use _id, its enough because its unique
    config.jwtSecret
  );
  return token;
}

// const bcrypt = require('bcryptjs');

router.get('/', function (req, res, next) {
  res.json({
    msg: 'hellow from auth',
  });
});

router
  .route('/register')
  //   .get(function (req, res, next) {
  //     res.send("tests get");
  //   })
  .post(function (req, res, next) {
    //console.log("req body >>>>", req.body);
    const newUser = new UserModel({});
    //newUser is mongoose object
    // newUser.name = req.body.name;
    // newUser.email = req.body.email;
    // newUser.userName = req.body.userName;
    // newUser.password = req.body.password;
    // newUser.phoneNumber = req.body.phoneNumber;
    // newUser.gender = req.body.gender;
    // newUser.dob = req.body.dateOfBirth;
    // newUser.numberOfPosts = req.body.numberOfPosts;
    // newUser.role = req.body.role;
    // newUser.status = req.body.status;
    // newUser.address = {
    //   temp_addr:
    //     typeof req.body.temp_addr === 'string' && req.body.temp_addr.split(','),
    //   permanent_addr: req.body.permanent_addr,
    // };
    const newMappedUser = MapUser(newUser, req.body);

    newMappedUser.password = passwordHash.generate(req.body.password);
    newMappedUser.save(function (err, done) {
      if (err) {
        return next({ msg: 'User not registered', err: err });
      }
      res.json(done);
    });
    // console.log("new mapped user >>>>>", newMappedUser);

    //this is now saving data into db

    // bcrypt.genSalt(10, function (err, salt) {
    //   bcrypt.hash(newMappedUser.password, salt, function (err, hash) {
    //     if (err) {
    //       return next(err);
    //     } else {
    //       newMappedUser.password = hash;
    //       newMappedUser.save(function (err, done) {
    //         if (err) {
    //           return next('error password', err);
    //         }
    //         res.json(done);
    //       });
    //     }
    //   });
    // });
  });

router.route('/login').post(function (req, res, next) {
  UserModel.findOne({
    // if use find only then it will output array but if use findOne it will output object
    userName: req.body.userName,
  })
    .then((user) => {
      if (user) {
        console.log('body requsted password', req.body.password);
        console.log('yes there is user', user.password);

        const isMatched = passwordHash.verify(req.body.password, user.password);
        console.log('ismatched>>>>>', isMatched);
        if (isMatched) {
          // const accessToken = jwt.sign(
          //   { userName: req.body.userName },
          //   '123123123123zzz'
          // );
          const accessToken = createToken(user);
          res.json({ accessToken, user });
        } else {
          next({ msg: 'password not matched', status: '404' });
        }
      } else {
        next({ msg: 'there is no user', status: '404' });
      }
    })
    .catch((error) => {
      next('this is login error message', error);
    });
});

module.exports = router;
