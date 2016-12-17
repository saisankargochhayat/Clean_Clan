//require express
var express = require('express');
var path = require('path');
var User = require('../model/user');
var Post = require('../model/post');
//create our router object
var router = express.Router();

//export our router
module.exports = router;


var auth = function(req, res, next) {
  if (req.session && req.session.email)
    return next();
  else
    return res.redirect('/login');
};
var user_id;

router.get('/', auth, function(req, res, next) {
  var ids= new Array(5);
  Post.find({}, function(err, posts) {
    // posts.forEach(function(post, index){
  //     // console.log(post.author)
  //     User.findOne({_id:post.author }, function(err, user) {
  //         ids[index]=user.image;
  //         console.log(ids[index]);
  //     });
  //   // var l=posts.length;
  //   // if (err) throw err;
  //   // for (i = 0; i < l; i++) {
  //   //   userid = posts[i].author;
  //   //   User.findOne({_id: userid }, function(err, user) {
  //   //     console.log("i m inside");
  //   //     idarray[i] = user.image;
  //   //     // console.log(idarray[i]); it's working
  //   //   }).then(function(){
  //   //     console.log("i  inside");
  //   //
  //   //     console.log(idarray[i]);
  //   //   //   // posts[i].author=idarray[i];
  //   //   //   console.log("author"+" "+i+" "+posts[i].author);
  //   // });
  //   // }
  //
  // });



    var render__data = {
      posts: posts,
    }
    res.render('./pages/timeline', render__data);
  });

  console.log("here comes ids");
  console.log(ids);
});
