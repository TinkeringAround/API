const express = require("express");
const router = express.Router();

const UserController = require("../controller/users");

router.get("/", UserController.root);
router.post("/signup", UserController.signup);
router.post("/logout", UserController.logout);
router.post("/login", UserController.login);

module.exports = router;
