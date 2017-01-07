//require express
var express = require('express');
var path = require('path');
var User = require('../model/user');
var Post = require('../model/post');
var multer = require('multer');

var mongoose = require('mongoose');
//create our router object
var router = express.Router();
//multer object
var storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, 'public/uploads/');
  },
  filename: function(request, file, callback) {
    callback(null, file.originalname + Date.now())
  }
});

var upload = multer({
  storage: storage
});



var auth = function(req, res, next) {
  if (req.session && req.session.email)
    return next();
  else
    return res.redirect('/login');
};
router.get('/', auth, function(req, res, next) {
  res.render('./pages/newpost');
})

router.post('/create', auth, upload.array('images', 12), function(req, res, next) {
  ///FOR Challenge
  if(req.body.type_post=="Challenge"){


      req.files[0].path = req.files[0].path.substr(req.files[0].path.indexOf('/') + 1, req.files[0].path.length - 1);
      if (req.files.length > 1) {
        res.send("Exceeds file limit");
      } else {
        if (!req.body.description || !req.body.location || !req.files[0].path
          || !req.body.stake_holders || !req.body.heading) {
          res.status(502).send("Insufficient Field Values")
        } else {
          var new_post = new Post({
            description: req.body.description,
            location: req.body.location,
            stake_holders: req.body.stake_holders,
            heading: req.body.heading,
            type_post:req.body.type_post,
            author: req.session.userid.toString(),
            author_image:req.session.userimage.toString(),
            image_before: req.files[0].path,
            image_after:"",
            like_count:0,
            likes:[],
            author_name:req.session.name
          });
          new_post.save(function(err, post) {
            if (err) {
              console.log(err);
              res.send(err)
            } else {
              User.findByIdAndUpdate(req.session.userid, {
                $inc: {
                 "like_count": 5
               }
              }, {
                   new: true
              }, function (err, user) {
                  if(err) res.send(err);
                  res.send("Post saved succesfully");
              });
            }
          });
        }
      }


  }
////FOR SOLUTION
  else{


  req.files[0].path = req.files[0].path.substr(req.files[0].path.indexOf('/') + 1, req.files[0].path.length - 1);
  req.files[1].path = req.files[1].path.substr(req.files[1].path.indexOf('/') + 1, req.files[1].path.length - 1);
  if (req.files.length > 2) {
    res.send("Exceeds file limit");
  } else {
    if (!req.body.description || !req.body.location || !req.files[0].path ||
      !req.files[1].path || !req.body.stake_holders || !req.body.heading) {
      res.status(502).send("Insufficient Field Values")
    } else {
      var new_post = new Post({
        description: req.body.description,
        location: req.body.location,
        stake_holders: req.body.stake_holders,
        heading: req.body.heading,
        type_post:req.body.type_post,
        author: req.session.userid.toString(),
        author_image:req.session.userimage.toString(),
        image_before: req.files[0].path,
        image_after: req.files[1].path,
        like_count:0,
        likes:[],
        author_name:req.session.name
      });
      new_post.save(function(err, post) {
        if (err) {
          console.log(err);
          res.send(err)
        } else {
              res.send("Post saved succesfully");
          }

      });
    }
  }

}
});


router.post('/:postId/solve',auth,upload.array('images', 12),function(req,res,next){
  console.log("Received solve request");
  Post.findById(req.params.postId,function(err,challenge_post){
    if(err){
      console.log(err);
    }else{
      if(challenge_post.type_post !== "Challenge"){
        console.log("Not a challenge");
        res.send("This post cannot be solved as it is not a challenge")
      }else{
        console.log("This is a challenge , continue");
        req.files[0].path = req.files[0].path.substr(req.files[0].path.indexOf('/') + 1, req.files[0].path.length - 1);
        req.files[1].path = req.files[1].path.substr(req.files[1].path.indexOf('/') + 1, req.files[1].path.length - 1);
        if (req.files.length > 2) {
          res.send("Exceeds file limit");
        }else{
          if (!req.body.description || !req.body.location || !req.files[0].path ||
            !req.files[1].path || !req.body.stake_holders || !req.body.heading) {
            res.status(502).send("Insufficient Field Values")
          }else{
            var new_post = new Post({
              description: req.body.description,
              location: req.body.location,
              stake_holders: req.body.stake_holders,
              heading: req.body.heading,
              type_post:req.body.type_post,
              author: req.session.userid.toString(),
              author_image:req.session.userimage.toString(),
              image_before: req.files[0].path,
              image_after: req.files[1].path,
              like_count:0,
              likes:[],
              author_name:req.session.name,
              challenge_user_name:challenge_post.author_name
            });
            new_post.save(function(err,solution_post){
              console.log(solution_post._id);
              Post.findByIdAndUpdate(challenge_post._id.toString(),
                                        {
                                          $set:{

                                            "solutions":solution_post._id.toString(),
                                            "solutions_user_name":solution_post.author_name

                                          }




                                        },function(err,post){
                if(err){
                  console.log(err);
                }else{
                  User.findByIdAndUpdate(req.session.userid, {
                    $inc: {
                     "like_count": 15
                   }
                  }, {
                       new: true
                  }, function (err, user) {
                      if(err) res.send(err);
                      res.send("Post saved succesfully");
                })
              }
              })
            })
          }
        }
      }
    }
  })
})
router.put('/:postId/like',auth,function(req,res,next){
  Post.findByIdAndUpdate(req.params.postId, {
    $push: {
     likes: req.session.userid
   }
  }, {
       new: true
  }, function (err, post) {
      if(err) throw(err);
      User.findByIdAndUpdate(post.author.toString(), {
        $inc: {
         "like_count":1
       }
      }, {
           new: true
      }, function (err, user) {
          if(err) res.send(err);
          res.send(user);
      });


  });





});

router.put('/:postId/unlike',auth,function(req,res,next){
  Post.findByIdAndUpdate(req.params.postId, {
    $pull: {
     likes: req.session.userid
   }
  }, {
       new: true
  }, function (err, post) {

    User.findByIdAndUpdate(post.author.toString(), {
      $inc: {
       "like_count":-1
     }
    }, {
         new: true
    }, function (err, user) {
        if(err) res.send(err);
        res.send(user);
    });


  });

});

// router.get('/:postId/checklike',auth,function(req,res,next){
//   Post.findById(req.params.postId, function(err,post){
//       if(err) throw(err);
//       if(post.likes.indexOf(req.session.userid)>=0)
//       res.send(true);
//       else {
//         res.send(false);
//       }
//
// })
//
// });


//
// router.put('/:userlike',auth,function(req,res,next){
//   User.findByIdAndUpdate(req.session.userid, {
//     $set: {
//      "like_count": req.params.userlike
//    }
//   }, {
//        new: true
//   }, function (err, user) {
//       if(err) res.send(err);
//       res.send(user);
//   });
//
// });


//export our router
module.exports = router;
