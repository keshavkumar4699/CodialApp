const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user.id,
  })
    .then((result) => {
      console.log("new post added");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("error in posting new post", err);
      res.redirect("/");
    });
  return;
};

module.exports.destroy = function(req, res){
  Post.findById(req.params.id)
  .then((post)=>{
    //.id means converting the object id into string and _id is object id
    if(post.user==req.user.id){
      post.deleteOne();
      Comment.deleteMany({post: req.params.id})
      .then(()=>{
        console.log("comments deleted");
        return res.redirect('back');
      })
      .catch((err)=>{
        console.log("Error in deleting comments on posts", err);
      })
    } else {
      return res.redirect('back');
    }
  })
  .catch((err)=>{
    console.log("Error in finding user for deleting comments", err);
  })
}
