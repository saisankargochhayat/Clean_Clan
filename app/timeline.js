//require express
var express = require('express');
var path = require('path');
var User = require('../model/user');
//create our router object
var router = express.Router();

//export our router
module.exports = router;

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'../timeline.html'));
  });
