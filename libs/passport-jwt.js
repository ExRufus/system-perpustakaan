const passport = require("passport");
const passportJwt = passport;

const { User } = require("../models")

const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const SECRETTOKEN = require("./secret");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRETTOKEN
}

passportJwt.use(new JwtStrategy(options, async (payload, done) => {
  User.findByPk(payload.id).then(user => done(null, user)).catch((err) => done(err, false));
}))

module.exports = passportJwt;