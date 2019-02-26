const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const annualExpenditures = require("../models/annualExpenditures");

// process.env.SECRET_KEY = "secret";

router.post("/addannualExpendituresInformation", (req, res, next) => {
  const annualExpendituresData = new annualExpenditures({
    q_desc: req.body.question
  });

  annualExpendituresData
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

router.get("/getannualExpendituresInformation", (req, res, next) => {
  annualExpenditures
    .find()
    .exec()
    .then(annualExpendituresData => {
      console.log(annualExpendituresData);
      return res.status(200).json({
        message: "successful",
        annualExpendituresLocalData: annualExpendituresData
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
