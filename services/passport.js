const _ = require('lodash');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      const avatarURL = profile.photos[0].value ? profile.photos[0].value : '';
      const emailAddresses = _.map(profile.emails, ({ value }) => { return value });
      User.findOne({ googleId: profile.id })
      .then((existinngUser) => {
        if (existinngUser) {
          existinngUser.lastLogin = Date.now();
          existinngUser.save()
          .then(done(null, existinngUser));
        } else {
          new User({
            googleId: profile.id,
            displayName: profile.displayName,
            emails: emailAddresses,
            avatarURL: avatarURL,
            gender: profile.gender
          })
          .save()
          .then(user => done(null, user));
        }
      });
    }
  )
);
