const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");

exports.root = (req, res, next) => {
  return res.status(200).json({
    routes: [
      {
        type: "POST",
        url: "http://157.230.106.78:30000/api/v1/users/signup",
        description: "Make a POST request with valid body for Signup",
        body: {
          email: "string",
          password: "string"
        }
      },
      {
        type: "POST",
        url: "http://157.230.106.78:30000/api/v1/users/login",
        description: "Make a POST request with valid body for Login",
        body: {
          email: "string",
          password: "string"
        }
      },
      {
        type: "POST",
        url: "http://157.230.106.78:30000/api/v1/users/logout",
        description: "Make a POST request with valid body for Logout",
        body: {
          email: "string",
          token: "string"
        }
      }
    ],
    time: new Date().toLocaleDateString()
  });
};

exports.signup = (req, res, next) => {
  if (
    !req.body.hasOwnProperty("email") ||
    !req.body.hasOwnProperty("password")
  ) {
    return res.status(500).json({
      error: "Signup has failed!",
      time: new Date().toISOString()
    });
  }

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail does already exist.",
          time: new Date().toISOString()
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
                time: new Date().toISOString()
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                createdAt: new Date().toDateString()
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User has been created.",
                    email: user.email,
                    time: new Date().toISOString()
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                    time: new Date().toISOString()
                  });
                });
            }
          });
        });
      }
    });
};

exports.login = (req, res, nex) => {
  if (
    !req.body.hasOwnProperty("email") ||
    !req.body.hasOwnProperty("password")
  ) {
    return res.status(500).json({
      error: "Login has failed.",
      time: new Date().toISOString()
    });
  }

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth has failed.",
          time: new Date().toISOString()
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth has failed.",
            time: new Date().toISOString()
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth is successful.",
            token: token,
            time: new Date().toISOString()
          });
        }
        res.status(401).json({
          message: "Auth has failed.",
          time: new Date().toISOString()
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        time: new Date().toISOString()
      });
    });
};

exports.delete = (req, res, next) => {
  if (!req.params.userID) {
    return res.status(500).json({
      error: "Deleting User has failed.",
      time: new Date().toISOString()
    });
  }

  User.remove({ _id: req.params.userID })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted.",
        time: new Date().toISOString()
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        time: new Date().toISOString()
      });
    });
};
