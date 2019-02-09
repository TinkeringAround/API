const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    routes: [
      {
        path: "/users",
        url: "http://157.230.106.78:30000/api/v1/users",
        description: "User Management Route"
      }
    ],
    time: new Date().toISOString()
  });
});

module.exports = router;
