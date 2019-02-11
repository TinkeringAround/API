const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const rootRoutes = require("./api/routes/root");
const mainRoutes = require("./api/routes/main");
const userRoutes = require("./api/routes/users");

// Database Setup
mongoose.connect(
  "mongodb+srv://admin:" +
    process.env.MONGODB_PASSWORD +
    "@api-uqlle.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/", rootRoutes);
app.use("/api/v1/", mainRoutes);
app.use("/api/v1/users/", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
    time: new Date().toISOString()
  });
});

module.exports = app;
