const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const business = require("../models/business");
const customerUser = require("../models/registerCustomer");

// process.env.SECRET_KEY = "secret";
router.post("/businessPage", (req, res, next) => {
  //console.log(res);

  var user_id = req.body.userId;
  var userEmail = req.body.userEmail;
  //console.log(userEmail);

  // if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
  //   console.log("valid");
  // }

  // console.log(req.body.textarea);
  const businessData = new business({
    userId: user_id,
    textarea: req.body.textarea
  });

  businessData
    .save()
    .then(result => {
      res.status(200).json({
        message: "business Questions are added"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/businessPage", (req, res, next) => {
  //console.log(req.body.userData);
  //console.log(req.body);
  var userEmail = req.body.email;
  //console.log(req.body._id);
  customerUser
    .find(userEmail)
    .exec()
    .then(user => {
      if (user.length >= 1) {
        business
          .find(userEmail)
          .exec()
          .then(businessData => {
            console.log(businessData);
            return res.status(200).json({
              message: "successful",
              businessDataLocal: businessData
            });
            //}
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    });
});
module.exports = router;
