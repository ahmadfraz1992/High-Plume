const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const savedLiabilities = require("../models/savedLiabilities");
const savedLiabilitiesAns = require("../models/liabilitiesAns");

// process.env.SECRET_KEY = "secret";

router.post("/savedLiabilities", (req, res, next) => {
  const savedLiabilitiesData = new savedLiabilities({
    cat_Id: req.body.cat_id,
    q_Id: req.body.q_Id,
    q_desc: req.body.q_desc
  });

  savedLiabilitiesData
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
  savedLiabilities
    .find()
    .exec()
    .then(questions => {
      console.log(questions);
      return res.status(200).json({
        message: "successful",
        liabilitiesLocalData: questions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/savedLiabilitiesAnswers", (req, res, next) => {
  const liabilitiesInfoData = new savedLiabilitiesAns({
    User_id: req.body._id,
    ans: req.body.textarea
  });

  liabilitiesInfoData
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
