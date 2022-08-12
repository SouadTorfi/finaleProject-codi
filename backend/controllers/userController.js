const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Controller {
  async AllUsers(req, res, next) {
    User.find({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async OneUser(req, res, next) {
    let { id } = req.params;
    User.findById(id).exec(function(error, response){
      if (error) return next(error);
      res.send(response);
    });
  }
  async deleteUser(req, res, next) {
    let { id } = req.params;
    User.deleteOne({ _id: id }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  async UpdateUser(req, res, next) {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
    };
    let { id } = req.params;
    User.updateOne({ _id: id }, { $set: newUser }, (error, response) => {
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

    User.findOne({ email }).then((user) => {
      if (user) return res.status(400).json({ msg: "user already exists" });

      const newuser = new User({ name, email, password, phone, address });

      // Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          newuser.password = hash;
          newuser.save().then((user) => {
            jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    password: user.password,
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
    User.findOne({ email }).then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      // Validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                address: user.address,
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
