const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const savedAnnualExpenditures = require("../models/savedAnnualExpenditures");
const savedAnnualExpendituresAns = require("../models/annualExpendituresAns");

// process.env.SECRET_KEY = "secret";

router.post("/savedAnnualExpenditures", (req, res, next) => {
  const savedAnnualExpendituresData = new savedAnnualExpenditures({
    cat_Id: req.body.cat_id,
    q_Id: req.body.q_Id,
    q_desc: req.body.q_desc
  });

  savedAnnualExpendituresData
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
  savedAnnualExpenditures
    .find()
    .exec()
    .then(questions => {
      console.log(questions);
      return res.status(200).json({
        message: "successful",
        annualExpenditureLocalData: questions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/savedAnnualExpendituresAnswers", (req, res, next) => {
  const annualExpendituresInfoData = savedAnnualExpendituresAns({
    User_id: req.body._id,
    ans: req.body.textarea
  });

  annualExpendituresInfoData
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
