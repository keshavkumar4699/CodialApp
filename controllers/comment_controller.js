const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
  Post.findById(req.body.post)
  .then((post)=>{
    Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user._id
    })
    .then((comment)=>{
      post.comments.push(comment);
      post.save();

      res.redirect('/');
    })
    .catch((err)=>{
      console.log("Error in creating comments", err);
    })
  })
  .catch((err)=>{
    console.log("Error in finding post with given id", err);
  })
}

module.exports.destroy = function(req, res){
  Comment.findById(req.params.id)
  .then((comment)=>{
    if(comment.user == req.user.id){
      let postId = comment.post;
      comment.deleteOne();
      Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}})
      .then((posts)=>{
        return res.redirect('back');
      })
      .catch((err)=>{
        console.log("error in finding post comment by id and updating it", err);
      })
    }
  })
  .catch((err)=>{
    console.log("error in finding post by id", err);
  })
}