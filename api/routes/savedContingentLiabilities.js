const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const savedcontingentLiabilities = require("../models/savedContingentLiabilities");
const savedContingentLiabilitiesAns = require("../models/contingentLiabilities");

// process.env.SECRET_KEY = "secret";

router.post("/savedContingentLiabilities", (req, res, next) => {
  const savedcontingentLiabilitiesData = new savedcontingentLiabilities({
    cat_Id: req.body.cat_id,
    q_Id: req.body.q_Id,
    q_desc: req.body.q_desc
  });

  savedcontingentLiabilitiesData
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
  savedcontingentLiabilities
    .find()
    .exec()
    .then(questions => {
      console.log(questions);
      return res.status(200).json({
        message: "successful",
        contingentLiabilitiesLocalData: questions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/savedContingentLiabilitiesAnswers", (req, res, next) => {
  const contingentLiabilitiesInfoData = savedContingentLiabilitiesAns({
    User_id: req.body._id,
    ans: req.body.textarea
  });

  contingentLiabilitiesInfoData
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
