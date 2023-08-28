const User = require("../models/user");
const db = require("../config/mongoose");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id)
      .then((docs) => {
        return res.render("profile", {
          title: "Profile",
          user: docs
        });
      })
      .catch((err) => {
        console.log("error in finding user", err);
        res.redirect("/user/signin");
      });
  } else {
    return res.redirect('/user/login');
  }
};

module.exports.login = function (req, res) {
  return res.render("login", {
    title: "LogIn",
  });
};

module.exports.signup = function (req, res) {
  return res.render("signup", {
    title: "SignUp",
  });
};

module.exports.create = function (req, res) {
  User.findOne({ email: req.body.email })
    .then((docs) => {
      if (!docs) {
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
  User.findOne({ email: req.body.email })
    .then((docs) => {
      if (docs) {
        if (docs.password === req.body.password) {
          res.cookie("user_id", docs.id);
          return res.redirect("/user/profile");
        } else {
          console.log("password incorrect");
          return res.redirect("/user/login");
        }
      } else {
        console.log("User not found");
        return res.redirect("/user/login");
      }
    })
    .catch((err) => {
      console.log("error in finding user for sigup", err);
      return res.redirect("/user/signup");
    });
};
