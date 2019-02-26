const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const asset = require("../models/assets");

// process.env.SECRET_KEY = "secret";

router.post("/addAssetInformation", (req, res, next) => {
  const assetData = new asset({
    q_desc: req.body.question
  });

  assetData
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

router.get("/getAssetInformation", (req, res, next) => {
  asset
    .find()
    .exec()
    .then(assetData => {
      console.log(assetData);
      return res.status(200).json({
        message: "successful",
        assetLocalData: assetData
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
