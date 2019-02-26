const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const annualIncome = require("../models/annualIncome");

// process.env.SECRET_KEY = "secret";

router.post("/addannualIncomeInformation", (req, res, next) => {
  const annualIncomeData = new annualIncome({
    q_desc: req.body.question
  });

  annualIncomeData
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

router.get("/getannualIncomeInformation", (req, res, next) => {
  annualIncome
    .find()
    .exec()
    .then(annualIncomeData => {
      console.log(annualIncomeData);
      return res.status(200).json({
        message: "successful",
        annualIncomeLocalData: annualIncomeData
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
