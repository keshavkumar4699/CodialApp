const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id)
    .then((user) => {
      return res.render("profile", {
        title: "Profile|Codial",
        profile_user: user,
      });
    })
    .catch((err) => {
      console.log("error in finding user for showing profile", err);
    });
};

module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("login", {
    title: "Codial|LogIn",
  });
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("signup", {
    title: "Codial|SignUp",
  });
};

module.exports.create = function (req, res) {
  User.findOne({ userid: req.body.userid })
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
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then((user)=>{
        return res.redirect('back');
      })
      .catch((err) => {
        console.log(`error in finding user for updation ${err}`);
      });
  } else {
    res.status(401).send('Unauthorized');
  }
};
