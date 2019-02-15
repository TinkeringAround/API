const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    maintainer: {
      name: "Thomas Maier",
      source: "https://github.com/TinkeringAround"
    },
    api: [
      {
        version: "v1",
        path: "/api/v1",
        date: "9.02.2019",
        status: "active"
      }
    ],
    time: new Date().toISOString()
  });
});

module.exports = router;
