const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const financialQuestions = require("../models/financialQuestions");

// process.env.SECRET_KEY = "secret";

router.post("/addfinancialQuestions", (req, res, next) => {
  const financiaQuestionsData = new financialQuestions({
    q_desc: req.body.question
  });

  financiaQuestionsData
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

router.get("/getfinancialQuestions", (req, res, next) => {
  financialQuestions
    .find()
    .exec()
    .then(financialData => {
      console.log(financialData);
      return res.status(200).json({
        message: "successful",
        financialLocalData: financialData
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
