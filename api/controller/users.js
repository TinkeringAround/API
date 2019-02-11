const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();
var codeGen = require("random-number");
sgMail.setApiKey(process.env.SENDGRID_KEY);

// Models
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
        type: "PATCH",
        url: "http://157.230.106.78:30000/api/v1/users/signup/:userID",
        description:
          "Make a PATCH request with valid body and params for Activating your User Account",
        body: {
          code: "string"
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
        type: "DELETE",
        url: "http://157.230.106.78:30000/api/v1/users/:userID",
        description: "Make a DELETE request with valid body for Logout",
        header: {
          authorization: "Bearer token"
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
          message: "Signup has failed.",
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
                createdAt: new Date().toDateString(),
                status: "unverified",
                code: codeGen({
                  min: 100000,
                  max: 999999,
                  integer: true
                }).toString()
              });

              user
                .save()
                .then(result => {
                  console.log(result);
                  const token = jwt.sign(
                    {
                      email: user.email,
                      userId: user._id
                    },
                    process.env.JWT_KEY,
                    {
                      expiresIn: "1h"
                    }
                  );

                  // Generate Email and then respond
                  sgMail.send({
                    to: user.email,
                    from: "maier.thomas94@gmail.com",
                    subject: "Your activation key is here!",
                    text:
                      "Here is your activation key:\n" +
                      user.code +
                      "\nThank your for your registration.",
                    html:
                      "<strong>Here is your activation key: " +
                      user.code +
                      " Thank your for your registration.</strong>"
                  });

                  res.status(201).json({
                    message: "User has been created.",
                    email: user.email,
                    token: token,
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

exports.activateUser = (req, res, next) => {
  if (
    !req.params.hasOwnProperty("userID") ||
    !req.body.hasOwnProperty("code")
  ) {
    return res.status(500).json({
      error: "Activating User has failed.",
      time: new Date().toISOString()
    });
  }

  User.find({ _id: req.params.userID })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Activating User has failed.",
          time: new Date().toISOString()
        });
      }

      if (user.status === "active") {
        return res.status(200).json({
          message: "Activating User was successful.",
          status: "active",
          time: new Date().toISOString()
        });
      } else {
        if (req.body.code === user.code) {
          user.status = "active";
          user.save().then(result => {
            console.log(result);
            return res.status(200).json({
              message: "Activating User was successful.",
              status: "active",
              time: new Date().toISOString()
            });
          });
        } else {
          return res.status(401).json({
            message: "Activating User has failed.",
            time: new Date().toISOString()
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        time: new Date().toISOString()
      });
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
          message: "Login has failed.",
          time: new Date().toISOString()
        });
      }

      if (user[0].status === "unverified") {
        return res.status(401).json({
          message: "Login has failed.",
          status: user[0].status,
          time: new Date().toISOString()
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Login has failed.",
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
            message: "Login has been successful.",
            token: token,
            time: new Date().toISOString()
          });
        }

        res.status(401).json({
          message: "Login has failed.",
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
        message: "User has been deleted succesfully.",
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
