const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const individualInformation = require("../models/individualInformation");

// process.env.SECRET_KEY = "secret";

router.post("/addIndividualInformation", (req, res, next) => {
  const individualInformationData = new individualInformation({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    companyName: req.body.companyName,
    address: req.body.address,
    phoneNo: req.body.phoneNo,
    businessPhoneNo: req.body.businessPhoneNo,
    businessAddress: req.body.businessAddress
  });

  individualInformationData
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

router.get("/getIndividualInformation", (req, res, next) => {
  var companyName = req.body.companyName;
  individualInformation
    .find(companyName)
    .exec()
    .then(individualInformationData => {
      console.log(individualInformationData);
      return res.status(200).json({
        message: "successful",
        individualLocalData: individualInformationData
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
