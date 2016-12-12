var express = require('express');
var path = require('path');
var User = require('../model/user');
//create our router object
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;

//export our router
module.exports = router;

router.get('/',function(req,res){
	console.log("Got get request");
	res.sendFile(path.join(__dirname,'../signup.html'));
});
router.post('/',function(req,res){
	console.log(req.body);
	if(!req.body.name || !req.body.email ||!req.body.city || !req.body.password ){
		res.status(502).send('Insufficient field values');
	}else {
	console.log("Step 0")
	var new_user = new User({
		name : req.body.name,
		email: req.body.email,
		password: req.body.password,
		city:req.body.city
	});

	User.findOne ({email:new_user.email},function(err,user){
		if(err){
			console.log(err);
			res.send(err);
		}else{
			if(user){
				console.log("Step 1");
				console.log(user);
				res.send("email aready registered")
			}else{
				console.log("hello");
				User.schema.pre('save', function(next) {
					var user = new_user;
					console.log(new_user);
					bcrypt.hash(user.password, 10, function(err, hash) {
						if(err) return next(err);
						user.password=hash;
						console.log(user);
						console.log("user saved");
						next();
					});
				});

				// new_user.save(function(err,user){
				// 	if(err){
				// 		res.send(err);
				// 	}
				// 	else{
				// 		res.send("User succesfully saved !");
				// 	}
				// });
			}
		}

  	});
	}
 });

router.get('/list',function(req,res){
	User.find(function(err,users){
		if(err){
			res.send(err);
		}else{
			res.send(users);
		}
	});

});
