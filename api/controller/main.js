exports.main = (req, res, next) => {
  return res.status(200).json({
    message: "Welcome Home!",
    author: "Thomas Maier",
    timestamp: new Date().toISOString()
  });
};
