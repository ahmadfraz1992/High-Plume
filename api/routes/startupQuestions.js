const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const startupQuestions = require("../models/startupQuestions");

// process.env.SECRET_KEY = "secret";

router.post("/addStartupQuestions", (req, res, next) => {
  const startupQuestionsData = new startupQuestions({
    q_desc: req.body.question
  });

  startupQuestionsData
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

router.get("/getStartupQuestions", (req, res, next) => {
  startupQuestions
    .find()
    .exec()
    .then(startupData => {
      console.log(startupData);
      return res.status(200).json({
        message: "successful",
        startupLocalData: startupData
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
