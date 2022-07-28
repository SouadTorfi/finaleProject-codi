const express = require("express");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Controller {
  async AllAdmins(req, res, next) {
    Admin.find({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async OneAdmin(req, res, next) {
    let { id } = req.params;
    Admin.findById(id, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async deleteAdmin(req, res, next) {
    let { id } = req.params;
    Admin.deleteOne({ _id: id }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async UpdateAdmin(req, res, next) {
    const newAdmin = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
    };
    let { id } = req.params;
    Admin.updateOne({ _id: id }, { $set: newAdmin }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }

  // JWT Functions Sign Up And Login
  signup = (req, res) => {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      res.status(400).json({ msg: "Please enter all fields" });
    }

    Admin.findOne({ email }).then((admin) => {
      if (admin) return res.status(400).json({ msg: "Admin already exists" });

      const newAdmin = new Admin({ name, email, password, phone, address });

      // Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin.save().then((admin) => {
            jwt.sign(
              { id: admin._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    address: admin.address,
                    password: admin.password,
                  },
                });
              }
            );
          });
        });
      });
    });
  };
  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: "Please enter all fields" });
    }
    Admin.findOne({ email }).then((admin) => {
      if (!admin) return res.status(400).json({ msg: "admin does not exist" });

      // Validate password
      bcrypt.compare(password, admin.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        jwt.sign(
          { id: admin._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                address: admin.address,
              },
            });
          }
        );
      });
    });
  };
}
const controller = new Controller();
module.exports = controller;
