const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const businessQuestions = require("../models/businessQuestions");

// process.env.SECRET_KEY = "secret";

router.post("/addbusinessQuestions", (req, res, next) => {
  const businessQuestionsData = new businessQuestions({
    q_desc: req.body.question
  });

  businessQuestionsData
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

router.get("/getbusinessQuestions", (req, res, next) => {
  businessQuestions
    .find()
    .exec()
    .then(businessData => {
      console.log(businessData);
      return res.status(200).json({
        message: "successful",
        businessLocalData: businessData
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
