const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-Auth");
const UserController = require("../controller/users");

//----------------------------------------------------------------//
router.get("/", UserController.root);

// Initial Registration and Verification
router.post("/signup", UserController.signup);
router.patch("/signup/:userID", UserController.activateUser);

router.post("/login", UserController.login);
router.delete("/:userID", checkAuth, UserController.delete);

module.exports = router;
