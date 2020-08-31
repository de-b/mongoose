var express = require("express");
var router = express.Router();
const UserModel = require("../model/user.model");

/* GET users listing. */

router
  .route("/")
  .get(function (req, res, next) {
    UserModel.find({}, { userName: 1, email: 1 }) // second parameter, now it will output username & email only
      .sort({ _id: -1 }) // descending order
      .limit(4) // will show only 2
      .exec(function (err, data) {
        if (err) {
          return next(err);
        }
        res.json(data);
      });
  })
  .post(function (req, res, next) {})
  .put(function (req, res, next) {})
  .delete(function (req, res, next) {});

router
  .route("/:id") //dynamic
  .get(function (req, res, next) {
    //here we can use anything like findOne
    // UserModel.findOne({_id: req.params.id}, function(err,result){

    // })
    UserModel.findById(req.params.id)
      .then((result) => {
        if (result) {
          res.json(result);
        } else {
          next({ msg: "user not found" });
        }
      })
      .catch((err) => next({ msg: "user not found", err: err }));
  })
  .post(function (req, res, next) {
    res.send("sadfsdf");
  })

  .delete(function (req, res, next) {
    UserModel.findById(req.params.id)
      .then((result) => {
        if (result) {
          result.remove(function (err, done) {
            if (err) {
              return next(err);
            }
            res.json(done);
          });
        } else {
          next({ msg: "user not found" });
        }
      })
      .catch((err) => next({ msg: "user not found", err: err }));
  })

  .put((req, res, next) => {
    UserModel.findById(req.params.id)
      .then((result) => {
        if (result) {
          if (req.body.name) {
            result.name = req.body.name;
          }
          if (req.body.email) {
            result.email = req.body.email;
          }
          if (req.body.userName) {
            result.userName = req.body.userName;
          }
          if (req.body.password) {
            result.password = req.body.password;
          }
          if (req.body.phoneNumber) {
            result.phoneNumber = req.body.phoneNumber;
          }
          if (req.body.gender) {
            result.gender = req.body.gender;
          }
          if (req.body.dob) {
            result.dob = req.body.dateOfBirth;
          }
          if (req.body.numberOfPosts) {
            result.numberOfPosts = req.body.numberOfPosts;
          }
          if (req.body.role) {
            result.role = req.body.role;
          }
          if (req.body.status) {
            result.status = req.body.status;
          }
          if (req.body.temp_addr) {
            result.address.temp_addr =
              typeof req.body.temp_addr === "string" &&
              req.body.temp_addr.split(",");
          }
          if (req.body.permanent_addr) {
            result.address.permanent_addr = req.body.permanent_addr.split(",");
          }

          result.save(function (err, done) {
            if (err) {
              return next({ msg: "what is the error", err: err });
            }
            res.json(done);
          });
        } else {
          next({ msg: "user not found during update" });
        }
      })
      .catch((err) => next({ msg: "user not found", err: err }));
  });

module.exports = router;
