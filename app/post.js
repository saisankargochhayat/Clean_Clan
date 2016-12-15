//require express
var express = require('express');
var path = require('path');
var User = require('../model/user');
var Post = require('../model/post');
var fs = require('fs');
var mongoose = require('mongoose');
//create our router object
var router = express.Router();
router.get('/',function(req,res,next){
  res.render('./pages/newpost');
})
router.post('/create',function(req,res,next){
  req.body = req.fields;
  if(!req.body.description || !req.body.location || !req.files.before_image || !req.files.after_image){
    res.status(502).send("Insufficient Field Values")
  }else{
    var b_image_path = req.files.before_image.path;
    var a_image_path = req.files.after_image.path;
    var b_image_type = req.files.before_image.type;
    var a_image_type = req.files.after_image.type;
    var b_bitmap = fs.readFileSync(b_image_path);
    var a_bitmap = fs.readFileSync(a_image_path);
    var b_imageBuffer = new Buffer(b_bitmap).toString('base64');
    var a_imageBuffer = new Buffer(a_bitmap).toString('base64');
    console.log(req.session.userid.toString());
    var new_post = new Post({
      description : req.body.description,
      location : req.body.location,
      author :req.session.userid.toString(),
      image_before:b_imageBuffer,
      image_before_type:b_image_type,
      image_after:a_imageBuffer,
      image_after_type:a_image_type
    });
    new_post.save(function(err,post){
      if(err){
        console.log(err);
        res.send(err)
      }else{
        res.send("Post saved succesfully");
      }
    });
  }
});

//export our router
module.exports = router;
