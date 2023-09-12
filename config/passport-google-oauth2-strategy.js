const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "109806819463-7qgaousr1j1cedl70l3su4t1hhuuhs30.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/user/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        //find user
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          //if user found set this user as req.user
          return done(null, user);
        } else {
          //if user not found create user and set it as req.user
          user = await User.create({
            userid: profile.displayName,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          return done(null, user);
        }
      } catch (err) {
        console.log("Error in google strategy passport", err);
        return;
      }
    }
  )
);

module.exports = passport;
