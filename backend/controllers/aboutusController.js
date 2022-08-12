const express = require("express");
const AboutUs = require("../models/aboutus");

class Controller {
  AllAboutUs = (req, res, next) => {
    AboutUs.find()
      .sort({ _id: -1 })
      .limit(1)
      .then((response, err) => {
        if (err) return next(err);
        res.status(200).json({ success: true, response });
      });
  };
  async OneAboutus(req, res, next) {
    let { id } = req.params;
    AboutUs.findById(id, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }

  async post(req, res, next) {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }

    let newAboutUs = await new AboutUs({
      title1: req.body.title1,
      paragraphe1: req.body.paragraphe1,
      paragraphe2: req.body.paragraphe2,
      paragraphe3: req.body.paragraphe3,
      paragraphe4: req.body.paragraphe4,
      image: reqFiles,
    });
    newAboutUs.save({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
      console.log("res ", response);
    });
  }
  async UpdateAboutUs(req, res, next) {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }

    // const newAboutUs = {
    //   title1: req.body.title1,
    //   paragraphe1: req.body.paragraphe1,
    //   paragraphe2: req.body.paragraphe2,
    //   paragraphe3: req.body.paragraphe3,
    //   paragraphe4: req.body.paragraphe4,
    //   image: reqFiles,
    // };
    let newAboutUs;
    if (reqFiles.length == 0) {
      newAboutUs = {
        title1: req.body.title1,
        paragraphe1: req.body.paragraphe1,
        paragraphe2: req.body.paragraphe2,
        paragraphe3: req.body.paragraphe3,
        paragraphe4: req.body.paragraphe4,
      };
    } else {
      newAboutUs = {
        title1: req.body.title1,
        paragraphe1: req.body.paragraphe1,
        paragraphe2: req.body.paragraphe2,
        paragraphe3: req.body.paragraphe3,
        paragraphe4: req.body.paragraphe4,
        image: reqFiles,
      };
    }

    let { id } = req.params;
    AboutUs.updateOne({ _id: id }, { $set: newAboutUs }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
}

const controller = new Controller();
module.exports = controller;
