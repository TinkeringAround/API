const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    api: [
      {
        version: "v1",
        path: "/api/v1",
        url: "http://157.230.106.78:30000/api/v1/",
        date: "9.02.2019"
      }
    ],
    time: new Date().toISOString()
  });
});

module.exports = router;
