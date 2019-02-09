require("dotenv").config();

exports.root = (req, res, next) => {
  return res.status(200).json({
    time: new Date().toLocaleDateString(),
    requests: [
      {
        type: "POST",
        url:
          "http://157.230.106.78:30000/api/" +
          process.env.API_VERSION +
          "/users/signup",
        description: "Make a POST request with valid body for Signup",
        body: {
          email: "string",
          password: "string"
        }
      },
      {
        type: "POST",
        url:
          "http://157.230.106.78:30000/api/" +
          process.env.API_VERSION +
          "/users/login",
        description: "Make a POST request with valid body for Login",
        body: {
          email: "string",
          password: "string"
        }
      },
      {
        type: "POST",
        url:
          "http://157.230.106.78:30000/api/" +
          process.env.API_VERSION +
          "/users/logout",
        description: "Make a POST request with valid body for Logout",
        body: {
          email: "string",
          token: "string"
        }
      }
    ]
  });
};

exports.signup = (req, res, next) => {
  if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
    return res.status(200).json({
      message: "Signup succeeded!",
      email: req.body.email,
      time: new Date().toISOString()
    });
  } else {
    return res.status(500).json({
      error: "Missing user data!",
      time: new Date().toISOString()
    });
  }
};

exports.login = (req, res, nex) => {
  if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
    return res.status(200).json({
      message: "Login succeeded!",
      token: "token",
      time: new Date().toISOString()
    });
  } else {
    return res.status(500).json({
      error: "Missing user data!",
      time: new Date().toISOString()
    });
  }
};

exports.logout = (req, res, next) => {
  if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("token")) {
    return res.status(200).json({
      message: "Logout successful!",
      time: new Date().toISOString()
    });
  } else {
    return res.status(401).json({
      error: "Unauthorized!",
      time: new Date().toISOString()
    });
  }
};
