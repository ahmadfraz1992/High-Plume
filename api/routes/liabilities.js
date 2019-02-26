const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const liabilities = require("../models/liabilities");

// process.env.SECRET_KEY = "secret";

router.post("/addLiabilitiesInformation", (req, res, next) => {
  const liabilitiesData = new liabilities({
    q_desc: req.body.question
  });

  liabilitiesData
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

router.get("/getLiabilitiesInformation", (req, res, next) => {
  liabilities
    .find()
    .exec()
    .then(liabilitiesData => {
      console.log(liabilitiesData);
      return res.status(200).json({
        message: "successful",
        liabilitiesLocalData: liabilitiesData
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
