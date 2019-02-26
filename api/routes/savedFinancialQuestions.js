const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const savedFinancial = require("../models/savedFinancialQuestions");

// process.env.SECRET_KEY = "secret";

router.post("/savedFinancialQuestions", (req, res, next) => {
  const savedFinancialData = new savedFinancial({
    cat_id: req.body.cat_id,
    q_Id: req.body.q_Id,
    q_desc: req.body.q_desc
  });

  savedFinancialData
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
  savedFinancial
    .find()
    .exec()
    .then(questions => {
      console.log(questions);
      return res.status(200).json({
        message: "successful",
        savedFinancialLocalData: questions
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
