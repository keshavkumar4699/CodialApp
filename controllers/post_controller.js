const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user.id,
  })
    .then((result) => {
      console.log("new post added");
      req.redirect("/");
    })
    .catch((err) => {
      console.log("error in posting new post", err);
      res.redirect("/");
    });
  return;
};
