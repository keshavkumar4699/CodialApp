const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("Invalid Username/Password");
            return done(null, false);
          }
          console.log("user found");
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding user----> Passport");
          return done(err);
        });
    }
  )
);

//serializing the user to decide which key is to be kept in the user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//desialise the user
passport.deserializeUser(function (id, done) {
  console.log("deserialising user");
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
