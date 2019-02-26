const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const startUp = require("../models/loan");
const customerUser = require("../models/registerCustomer");

// process.env.SECRET_KEY = "secret";

router.post("/startupPage", (req, res, next) => {
  //console.log(res);

  var user_id = req.body._id;
  var userEmail = req.body.userEmail;
  //console.log(userEmail);

  // if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
  //   console.log("valid");
  // }

  // console.log(req.body.textarea);
  const startupData = new startUp({
    userId: user_id,
    textarea: req.body.textarea
  });

  startupData
    .save()
    .then(result => {
      res.status(200).json({
        message: "Startup Questions are added"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/startupPage", (req, res, next) => {
  //console.log(req.body.userData);
  //console.log(req.body);
  // var userEmail = req.body.email;
  var userId = req.body._id;
  console.log(req.body._id);
  customerUser
    .find(userId)
    .exec()
    .then(user => {
      //if (user.length >= 1) {
      startUp
        .find(userId)
        .exec()
        .then(startupData => {
          console.log(startupData);
          return res.status(200).json({
            message: "successful",
            startupDataLocal: startupData
          });
          //}
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      //}
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
