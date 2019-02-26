const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const savedAsset = require("../models/savedAsset");
const savedAssetAns = require("../models/assetAns");
// process.env.SECRET_KEY = "secret";

router.post("/savedAsset", (req, res, next) => {
  const savedAssetData = new savedAsset({
    cat_Id: req.body.cat_id,
    q_Id: req.body.q_Id,
    q_desc: req.body.q_desc
  });

  savedAssetData
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
  savedAsset
    .find()
    .exec()
    .then(questions => {
      console.log(questions);
      return res.status(200).json({
        message: "successful",
        savedAssetLocalData: questions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/savedAssetAnswers", (req, res, next) => {
  const assetInfoData = new savedAssetAns({
    User_id: req.body._id,
    ans: req.body.textarea
  });

  assetInfoData
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
