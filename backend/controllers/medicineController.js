const express = require("express");
const Medicine = require("../models/medicine");

class Controller {
  lastMedecines = (req, res, next) => {
    Medicine.find()
      .sort({ _id: -1 })
      .limit(6)
      .populate("user_id")
      .populate("category_id")
      .then((response, err) => {
        if (err) return next(err);
        res.status(200).json({ success: true, response });
      });
  };

  // async AllMedicines(req, res, next) {
  //   let user_id_query = req.query.user_id;
  //   let query_medicine = {};
  //   if (user_id_query) {
  //     query_medicine = { user_id: user_id_query };
  //   }
  //   Medicine.find(query_medicine)
  //       .populate("category_id")
  //       .populate("user_id").exec(function (error, response) {
  //     if (error) return next(error);
  //     res.send(response);
  //   });
  // }
  async AllMedicines(req, res, next) {
    let user_id_query = req.query.user_id;
    let query_medicine = {};
    if (user_id_query) {
      query_medicine = { user_id: user_id_query };
    }

    try {
      let query = Medicine.find(query_medicine)
        .populate("category_id")
        .populate("user_id");
      // then we want to get which page we are in
      const page = parseInt(req.query.page) || 1;
      // then we  decide the limit on how much product will be shown
      const pageSize = parseInt(req.query.limit) || 12;
      // then we calculate how ma ny doc we want to skip
      const skip = (page - 1) * pageSize;
      // and then we calculate total document count
      // const total = await Product.countDocuments();
      const total = await Medicine.countDocuments(query);
      // here we are dividing the total on page sizes
      const pages = Math.ceil(total / pageSize);
      // and after that we are skipping
      query = query.skip(skip).limit(pageSize);

      if (page > pages) {
        return res.status(404).json({
          status: "fail",
          message: "No page found",
        });
      }

      const result = await query;
      res.status(200).json({
        status: "success",
        count: result.length,
        page,
        pages,
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "Server Error",
      });
    }
  }
  // async AllMedicinesUserID(req, res, next) {
  //   try {
  //     let query = Medicine.find({}).populate("category_id").populate("user_id");
  //     // then we want to get which page we are in
  //     const page = parseInt(req.query.page) || 1;
  //     // then we  decide the limit on how much product will be shown
  //     const pageSize = parseInt(req.query.limit) || 12;
  //     // then we calculate how ma ny doc we want to skip
  //     const skip = (page - 1) * pageSize;
  //     // and then we calculate total document count
  //     // const total = await Product.countDocuments();
  //     const total = await Medicine.countDocuments(query);
  //     // here we are dividing the total on page sizes
  //     const pages = Math.ceil(total / pageSize);
  //     // and after that we are skipping
  //     query = query.skip(skip).limit(pageSize);

  //     if (page > pages) {
  //       return res.status(404).json({
  //         status: "fail",
  //         message: "No page found",
  //       });
  //     }

  //     const result = await query;
  //     res.status(200).json({
  //       status: "success",
  //       count: result.length,
  //       page,
  //       pages,
  //       data: result,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       status: "error",
  //       message: "Server Error",
  //     });
  //   }
  // }
  async OneMedicine(req, res, next) {
    let { id } = req.params;
    Medicine.findById(id)
      .populate("category_id")
      .populate("user_id")
      .exec(function (error, response) {
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

    let newMedicine = await new Medicine({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description,
      expiredDate: req.body.expiredDate,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
      image: reqFiles,
    });
    newMedicine.save({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
      console.log("res ", response);
    });
  }
  async UpdateMedicine(req, res, next) {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }
   
    let newMedicine;
    if (reqFiles.length == 0) {
      newMedicine = {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        expiredDate: req.body.expiredDate,
        user_id: req.body.user_id._id,
        category_id: req.body.category_id,
      };
    } else {
      newMedicine = {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        expiredDate: req.body.expiredDate,
        user_id: req.body.user_id._id,
        category_id: req.body.category_id,
        image: reqFiles,
      };
    }

    console.log("newMedicine ", newMedicine);

    let { id } = req.params;
    Medicine.updateOne({ _id: id }, { $set: newMedicine }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async deleteMedicine(req, res, next) {
    let { id } = req.params;
    Medicine.deleteOne({ _id: id }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
}

const controller = new Controller();
module.exports = controller;
