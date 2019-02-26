const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const questionsTable = require("../models/questionsTable");
var questionsLocalData;
// process.env.SECRET_KEY = "secret";

router.post("/addQuestions", (req, res, next) => {
  const questionData = new questionsTable({
    q_desc: req.body.question
  });

  questionData
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

router.get("/getQuestions", (req, res, next) => {
  var _id;
  let i = 2;
  for (; i < 41; i++) {
    id = i;
    questionsTable
      .find(_id)
      .exec()
      .then(questions => {
        console.log(questions);
        return res.status(200).json({
          message: "successful",
          questionsLocalData: questions
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
});
module.exports = router;
