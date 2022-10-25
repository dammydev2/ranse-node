const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");
const validator = require("../app/request/registerValidator");

router.post("/register", validator.validateUser, userController.create);
router.post("/authenticate", userController.authenticate);

module.exports = router;
