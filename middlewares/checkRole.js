const checkRole = (role) => {
  return function (req, res, next) {
    if (req.isAuthenticated() && role.includes(req.user.role.name)) {
      return next();
    }
    res.redirect("/login");
  }
}

module.exports = checkRole;