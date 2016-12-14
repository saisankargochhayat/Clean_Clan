var express = require('express');
var path = require('path');
var User = require('../model/user');
//create our router object
var router = express.Router();
var bcrypt = require('bcrypt');
var fs = require('fs');
const saltRounds = 10;
//export our router
module.exports = router;

router.get('/',function(req,res,next){
	console.log("Got get request");
	res.sendFile(path.join(__dirname,'../signup.html'));
});
router.post('/',function(req,res){
	req.body = req.fields;
	if(!req.body.name || !req.body.email ||!req.body.city || !req.body.password ){
		res.status(502).send('Insufficient field values');
	}else {
		var image_path = req.files.image.path;
		var bitmap = fs.readFileSync(image_path);
		imageBuffer = new Buffer(bitmap).toString('base64');

		var new_user = new User({
			name : req.body.name,
			email: req.body.email,
			password: req.body.password,
			city:req.body.city,
			image:imageBuffer,
			image_type:req.files.image.type
		});
		User.findOne ({email:new_user.email},function(err,user){
			if(err){
				console.log(err);
				res.send(err);
			}else{
				if(user){
					console.log("Step 1");
					// console.log(user);
					res.send("email aready registered")
				}else{
					console.log("hello");
					new_user.save(function(err,user){
						if(err){
							console.log(err);
							res.send(err);
						}
						else{
							res.send("User succesfully saved !");
						}
					});
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
