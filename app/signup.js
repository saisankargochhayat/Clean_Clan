var express = require('express');
var path = require('path');
var User = require('../model/user');
var multer = require('multer');
var mongoose = require('mongoose');
var nev =require('../app/emailverify')(mongoose);


//email-verification
//////////////////////////////////////////////////////////////////////////////

nev.configure({
  persistentUserModel: User,
  expirationTime: 600, // 10 minutes

  verificationURL: 'http://localhost:3000/signup/email-verification/${URL}',
  transportOptions: {
           ////gmail id that i created to send verification mails don't misuse plzz
    service: 'Gmail',
    auth: {
      user: 'abhisinghs359@gmail.com',
      pass: 'mypetname'
    }
  },


}, function(err, options) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('configured: ' + (typeof options === 'object'));
});

nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
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
             var email=req.body.email;
        var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        image: req.files[0].path,
				like_count:0,
        user_details:req.body.user_details,
      });
      // User.findOne({
      //   email: new_user.email
      // }, function(err, user) {
      //   if (err) {
      //     console.log(err);
      //     res.send(err);
      //   } else {
      //     if (user) {
      //       console.log("Step 1");
      //       // console.log(user);
      //       res.send("email already registered")
      //     } else {
      //       new_user.save(function(err, user) {
      //         if (err) {
      //           console.log(err);
      //           res.send(err);
      //         } else {
      //           res.send("User succesfully saved !");
      //         }
      //       });
      //     }
      //   }
      // });


      nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
        if (err) {
          return res.status(404).send('ERROR: creating temp user FAILED');
        }

        // user already exists in persistent collection
        if (existingPersistentUser) {
           console.log("user exists in db");
          res.send("email already registered");
          return
        }

        // new user created
        if (newTempUser) {
          var URL = newTempUser[nev.options.URLFieldName];

          nev.sendVerificationEmail(email, URL, function(err, info) {
            if (err) {
              return res.status(404).send('ERROR: sending verification email FAILED');
            }
            res.json({
              msg: "An email has been sent to you. Please check it to verify your account.",
              info: info
            });
          });

        // user already exists in temporary collection!
        } else {
          res.json({
            msg: "You have already signed up. Please check your email to verify your account."
          });
        }
      });
    }
  }

});

// user accesses the link that is sent
router.get('/email-verification/:URL', function(req, res) {
  var url = req.params.URL;

  nev.confirmTempUser(url, function(err, user) {
    if (user) {
      nev.sendConfirmationEmail(user.email, function(err, info) {
        if (err) {
          return res.status(404).send('ERROR: sending confirmation email FAILED');
        }
        // res.json({
        //   msg: 'CONFIRMED ho gaya!',
        //   info: info
        // });
        res.sendFile(path.join(__dirname,'../confirm_mail.html'));
      });


    } else {
      return res.status(404).send('ERROR: confirming temp user FAILED');
    }
  });
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
