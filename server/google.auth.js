const passport = require('passport');

const { User } = require('./db/models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('=====>');
      console.log({ profile });
      done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  console.log('=====> serializeUser');
  console.log({ user });
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('=====> deserializeUse');
  console.log({ user });
  done(null, user);
});
