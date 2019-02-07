const express = require("express");
const router = express.Router();

const UserController = require("../controller/user");

router.post("/signup", UserController.signup);

module.exports = router;
