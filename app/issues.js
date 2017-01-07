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

router.get('/',auth,function(req, res, next) {
  res.render('./pages/issues');
});


router.post('/create', auth, upload.array('images', 12), function(req, res, next) {
  if(!req.body.email_to || !req.body.issue ||!req.files){
      res.status(502).send('Insufficient field values');
    }else {
        res.send("Issue has been recorded");
    }

});

//export our router
module.exports = router;
