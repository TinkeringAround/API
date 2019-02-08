exports.signup = (req, res, next) => {
  return res.status(200).json({
    message: "Signup succeeded!"
  });
};

exports.logout = (req, res, next) => {
  return res.status(200).json({
    message: "Logout successful!",
    time: new Date().toISOString()
  });
};
