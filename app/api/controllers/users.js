const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

module.exports = {
  create: function (req, res, next) {
    userModel.create(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        wallet: {
          balance: "0",
        },
      },
      function (err, result) {
        if (err) {
          res.json({
            status: "error",
            message: "Please correct the following errors",
            data: err.errors,
          });
        } //next(err);
        else
          res.json({
            status: "success",
            message: "User added successfully!!!",
            data: null,
          });
      }
    );
  },

  authenticate: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({
            status: "success",
            message: "user found!!!",
            data: { user: userInfo, token: token },
          });
        } else {
          res.json({
            status: "error",
            message: "Invalid email/password!!!",
            data: null,
          });
        }
      }
    });
  },
};
