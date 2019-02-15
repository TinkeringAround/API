const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    routes: [
      {
        path: "/users",
        description: "User Management Route"
      },
      {
        path: "/puzzles",
        description: "Puzzle Management Route"
      }
    ],
    time: new Date().toISOString()
  });
});

module.exports = router;
