const User = require("../models/user");
const fs = require('fs');
const path = require('path');

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
  req.flash('success', 'Logged in Successfully');
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    req.flash('success', 'You have logged out');
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try{
      let user = await User.findByIdAndUpdate(req.params.id, req.body);
      User.uploadedAvatar(req, res, function(err){
        
        if(err){ console.log('*****Multer error', err) }
        
        user.name = req.body.name;
        user.email = req.body.email;
        
        if(req.file){

          if(user.avatar){
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
          }

          //this is saving the path of uploaded file into the avatar field in the user
          user.avatar = User.avatarPath+'/'+req.file.filename
        }
        user.save();
        return res.redirect('back');
      })
    } catch(err){
      console.log(`error in finding user for updation ${err}`);
    }
  } else {
    req.flash('error', 'Unauthorized');
    res.status(401).send('Unauthorized');
  }
};
