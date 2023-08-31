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

//check if user is authenticated
passport.checkAuthentication = function(req, res, next){
  //if user is signed in pass on the request to next function i.e my controller's action
  if(req.isAuthenticated()){
    return next();
  }
  //if user is not signed in
  return res.redirect('/user/login');
}

passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
    //req.user contains current signed in user from the session cookie and we are just sending in to the locals for the views
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;

