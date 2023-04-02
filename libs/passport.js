const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User, Role } = require("./../models");

const authenticate = (email, password, done) => {
  User.findOne({ where: { email} }).then(user => {
    if (!user) {
      return done(null, false, { message: "Incorrect email or password."});
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return done(null, false, { message: "Incorrect email or password."});
      }

      return done(null, user);
    });
  });
};

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, authenticate));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id, {
    include: [
      {
        model: Role,
        as: "role"
      }
    ]
  }).then(user => {
    done(null, user);
  });
});

module.exports = passport;