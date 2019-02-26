const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const savedIndividualInfo = require("../models/savedIndividualInfoQuestions");
const savedIndividualInfoAns = require("../models/individualInfoAns");

// process.env.SECRET_KEY = "secret";

router.post("/savedInfoQuestions", (req, res, next) => {
  const individualInfoData = new savedIndividualInfo({
    cat_id: req.body.cat_id,
    q_Id: req.body.q_Id,
    q_desc: req.body.q_desc
  });

  individualInfoData
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
  savedIndividualInfo
    .find()
    .exec()
    .then(questions => {
      console.log(questions);
      return res.status(200).json({
        message: "successful",
        savedInfoLocalData: questions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/savedInfoAnswers", (req, res, next) => {
  const individualInfoData = new savedIndividualInfoAns({
    User_id: req.body._id,
    q_desc: req.body.q_desc,
    ans: req.body.textarea
  });

  individualInfoData
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
