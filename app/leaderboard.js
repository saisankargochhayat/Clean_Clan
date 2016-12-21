//require express
var express = require('express');
var path = require('path');
var User = require('../model/user');
var Post = require('../model/post');


var mongoose = require('mongoose');
//create our router object
var router = express.Router();

var auth = function(req, res, next) {
  if (req.session && req.session.email)
    return next();
  else
    return res.redirect('/login');
};
router.get('/', auth, function(req, res, next) {

User.find().sort({like_count:-1})
.exec(function(err, user) {
  if(err) throw err;
  var render__data = {
      user: user,
      current_userid:req.session.userid,
    }
    res.render('./pages/leaderboard', render__data);

 });




})






//export our router
module.exports = router;
