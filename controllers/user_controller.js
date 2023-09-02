const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Codial",
  });
};

module.exports.login = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }
  return res.render("login", {
    title: "Codial|LogIn",
  });
};

module.exports.signup = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }
  return res.render("signup", {
    title: "Codial|SignUp",
  });
};

module.exports.create = function (req, res) {
  User.findOne({ userid: req.body.userid })
    .then((docs) => {
        if(!docs){
            User.create(req.body)
            .then((result) => {
              console.log("new user added");
              res.redirect("/user/login");
            })
            .catch((err) => {
              console.log("error in creating user while signing up", err);
              res.redirect("/user/login");
            });
        } else {
            console.log("user already exist");
            res.redirect("/user/signup");
        }
    })
    .catch((err) => {
      console.log("error in finding user for sigup", err);
      res.redirect("/user/signup");
    });
};

module.exports.createSession = function (req, res) {
  return res.redirect('/user/profile');
};

module.exports.destroySession = function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

