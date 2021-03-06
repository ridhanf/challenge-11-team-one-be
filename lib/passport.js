const passport = require('passport')
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const {Users} = require('../db/models')
require('dotenv').config()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // bearer token
  // jwtFromRequest: ExtractJwt.fromHeader('authorization'), // header
  secretOrKey: process.env.JWT_SECRET_KEY
}

/* Authentication Function */
const authenticate = async (payload, done) => {
  try {
    const user = await Users.findByPk(payload.id);
    return done(null, user)
  } catch (err) {
    return done(null, false, {message: err.message})
  }
}

passport.use(new JwtStrategy(options, authenticate));

module.exports = passport;
