const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-Auth");
const UserController = require("../controller/users");

router.get("/", UserController.root);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.delete("/:userID", checkAuth, UserController.delete);

module.exports = router;
