const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const financial = require("../models/financial");
const customerUser = require("../models/registerCustomer");
// process.env.SECRET_KEY = "secret";

router.post("/financialPage", (req, res, next) => {
  //console.log(res);

  var user_id = req.body.userId;
  var userEmail = req.body.userEmail;
  //console.log(userEmail);

  // if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
  //   console.log("valid");
  // }

  // console.log(req.body.textarea);
  const financialData = new financial({
    userId: user_id,
    textarea: req.body.textarea
  });

  financialData
    .save()
    .then(result => {
      res.status(200).json({
        message: "financial Questions are added"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.get("/financialPage", (req, res, next) => {
  //console.log(req.body.userData);
  //console.log(req.body);

  var userEmail = req.body.email;
  console.log(userEmail);
  user
    .find(userEmail)
    .exec()
    .then(user => {
      if (user.length >= 1) {
        financial
          .find(userEmail)
          .exec()
          .then(financialData => {
            console.log(financialData);
            return res.status(200).json({
              message: "successful",
              financialDataLocal: financialData
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
