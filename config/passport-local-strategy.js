const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    function (req, email, password, done) {

      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("Invalid Username/Password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding user----> Passport");
          return done(err);
        });
    }
  )
);

//serialise the user to know which key is to be kept
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialise the user
passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then((user)=>{
    return done(null, user);
  })
  .catch((err)=>{
    console.log("Error in finding user----->Passport");
      return done(err);
  });
});

module.exports = passport;

