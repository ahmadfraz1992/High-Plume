const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const savedAnnualIncome = require("../models/savedAnnualIncome");
const savedAnnualIncomeAns = require("../models/annualIncomeAns");

// process.env.SECRET_KEY = "secret";

router.post("/savedAnnualIncome", (req, res, next) => {
  const savedAnnualIncomeData = new savedAnnualIncome({
    cat_Id: req.body.cat_id,
    q_Id: req.body.q_Id,
    q_desc: req.body.q_desc
  });

  savedAnnualIncomeData
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

router.get("/getSelectedQuestions", (req, res, next) => {
  savedAnnualIncome
    .find()
    .exec()
    .then(questions => {
      console.log(questions);
      return res.status(200).json({
        message: "successful",
        annualIncomeLocalData: questions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/savedAnnualIncomeAnswers", (req, res, next) => {
  const annualIncomeInfoData = savedAnnualIncomeAns({
    User_id: req.body._id,
    ans: req.body.textarea
  });

  annualIncomeInfoData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Answers are saved"
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
