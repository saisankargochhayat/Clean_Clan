var express = require('express');
var path = require('path');
var User = require('../model/user');
var multer = require('multer');


//create our router object
var router = express.Router();
var bcrypt = require('bcrypt');
// var fs = require('fs');
const saltRounds = 10;
//export our router
module.exports = router;


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


//Handling requests begin
router.get('/', function(req, res, next) {
  console.log("Got get request");
  res.sendFile(path.join(__dirname, '../signup.html'));
});

router.post('/', upload.array('files', 12), function(req, res, next) {
	console.log(req.body);
	console.log(req.files);
	console.log(req.files.length);
	console.log(req.files[0].path);
  req.files[0].path=req.files[0].path.substr(req.files[0].path.indexOf('/')+1,req.files[0].path.length-1);

  if (req.files.length > 1) {
    res.send("Exceeds file limit");
  } else {
    if (!req.body.name || !req.body.email || !req.body.city || !req.body.password) {
      res.status(502).send('Insufficient field values');
    } else {
        var new_user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        image: req.files[0].path,
				like_count:0
      });
      User.findOne({
        email: new_user.email
      }, function(err, user) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          if (user) {
            console.log("Step 1");
            // console.log(user);
            res.send("email already registered")
          } else {
            new_user.save(function(err, user) {
              if (err) {
                console.log(err);
                res.send(err);
              } else {
                res.send("User succesfully saved !");
              }
            });
          }
        }
      });
    }
  }

});

router.get('/list', function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });

});
