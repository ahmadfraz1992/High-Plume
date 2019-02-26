const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const contingentLiabilities = require("../models/contingentLiabilities");

// process.env.SECRET_KEY = "secret";

router.post("/addcontingentLiabilitiesInformation", (req, res, next) => {
  const contingentLiabilitiesData = new contingentLiabilities({
    q_desc: req.body.question
  });

  contingentLiabilitiesData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "questions Added"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/getcontingentLiabilitiesInformation", (req, res, next) => {
  contingentLiabilities
    .find()
    .exec()
    .then(contingentLiabilitiesData => {
      console.log(contingentLiabilitiesData);
      return res.status(200).json({
        message: "successful",
        contingentLiabilitiesLocalData: contingentLiabilitiesData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
