const Post = require('../models/post')

module.exports.home = function (req, res) {
  Post.find().populate('user')
  .then((posts)=>{
    return res.render('home',{
      title: "Codial|Home",
      posts: posts
    })
  })
  .catch((err)=>{
  })
};