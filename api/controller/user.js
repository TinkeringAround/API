exports.signup = (req, res, next) => {
  return res.status(200).json({
    message: "Signup succeeded!"
  });
};
