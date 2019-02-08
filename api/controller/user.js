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
