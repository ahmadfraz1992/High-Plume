const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const savedBusiness = require("../models/savedBusinessQuestions");

// process.env.SECRET_KEY = "secret";

router.post("/savedBusinessQuestions", (req, res, next) => {
  const savedBusinessData = new savedBusiness({
    cat_id: req.body.cat_id,
    q_Id: req.body.q_Id,
    q_desc: req.body.q_desc
  });

  savedBusinessData
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
  savedBusiness
    .find()
    .exec()
    .then(questions => {
      console.log(questions);
      return res.status(200).json({
        message: "successful",
        savedBusinessLocalData: questions
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
