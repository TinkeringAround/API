const express = require("express");
const router = express.Router();

const MainController = require("../controller/main");

router.get("", MainController.main);

module.exports = router;
