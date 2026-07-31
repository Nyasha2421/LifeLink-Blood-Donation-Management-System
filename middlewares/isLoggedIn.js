const isLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  }
  res.redirect("/login");
};

module.exports = isLoggedIn;
