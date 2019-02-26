const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const savedStartup = require("../models/savedStartupQuestions");

// process.env.SECRET_KEY = "secret";

router.post("/savedStartupQuestions", (req, res, next) => {
  const savedStartupData = new savedStartup({
    cat_Id: req.body.cat_id,
    q_Id: req.body.q_Id,
    q_desc: req.body.q_desc
  });

  savedStartupData
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
  savedStartup
    .find()
    .exec()
    .then(questions => {
      console.log(questions);
      return res.status(200).json({
        message: "successful",
        savedStartupLocalData: questions
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
