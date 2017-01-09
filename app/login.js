var express = require('express');
var path = require('path');
var User = require('../model/user');
//create our router object
var bcrypt = require('bcrypt');
const saltRounds = 10;
var router = express.Router();

//export our router
module.exports = router;

router.get('/',function(req,res){
	console.log("Got get request");
	res.sendFile(path.join(__dirname,'../login.html'));
});
router.post('/',function(req,res){
		console.log("got post request");
	//res.send(req.body);
	// req.body = req.fields;
	if(!req.body.email || !req.body.password){
		  res.status(502).send('Insufficient field values');
		//res.send("enter some data/empty fields are present");
	}else{
		User.findOne({email:req.body.email},function(err,user){
			if(err){
				console.log(err);
				res.send(err);
			}
			if(!user){
				//res.redirect('/signup');
				res.send("Not registered");
			}
			else{
				bcrypt.compare(req.body.password, user.password, function(err, result) {
						// res == true
						console.log(result);
						if(err) console.log(err);

						else if(result) {
							req.session.email = user.email;
							req.session.userid = user._id;
							req.session.userimage=user.image;
							req.session.name=user.name;
							console.log(req.session.userid + " is the id");
							console.log(req.session.userimage + " is the image");
							response={};
							response[0]="Success";
							response[1]= user._id;
							res.send(response);
						}
						else {
							res.send("wrong password")
						}
					});
				// 	if(user.password == req.body.password){
				// 	req.session.email = user.email;
				// 	res.send("Success")
				// 	// res.redirect('/profile');
				// }
				// else{res.send("wrong password");
				// 	}

			}
		});
	};

});
