exports.isUser = (req, res, next) => {
  if (req.cookies["jwt"]) {
    req.user = req.cookies["jwt"]["id"];
  }
  next();
};
