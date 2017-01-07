var express = require('express');
var path = require('path');
var User = require('../model/user');
var Post = require('../model/post');


var router = express.Router();


var auth = function(req, res, next) {
  if (req.session && req.session.email)
    return next();
  else
    return res.redirect('/login');
};

router.get('/',function(req, res, next) {
  res.render('./pages/report');
});

router.post('/create',function(req, res, next) {
  if(!req.body.Reason){
      res.status(502).send('Insufficient field values');
    }else {
        res.send("Issue has been recorded");
    }
});





















//export our router
module.exports = router;
