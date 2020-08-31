const express = require("express");
const router = express.Router();
const UserModel = require("../model/user.model");
const MapUser = require("../helpers/mapUserRequest");

router.get("/", function (req, res, next) {
  res.json({
    msg: "hellow from auth",
  });
});

router.route("/login").post(function (req, res, next) {
  UserModel.findOne({
    // if use find only then it will output array but if use findOne it will output object
    userName: req.body.userName,
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
      //here we have used catch method so no need to use return
    });
});
router
  .route("/register")
  //   .get(function (req, res, next) {
  //     res.send("tests get");
  //   })
  .post(function (req, res, next) {
    console.log("req body >>>>", req.body);
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
    //     typeof req.body.temp_addr === "string" && req.body.temp_addr.split(","),
    //   permanent_addr: req.body.permanent_addr,
    // };
    const newMappedUser = MapUser(newUser, req.body);
    console.log("new mapped user >>>>>", newMappedUser);

    //this is now saving data into db
    newMappedUser.save(function (err, done) {
      if (err) {
        return next(err);
      }
      res.json(done);
    });
  });

module.exports = router;
