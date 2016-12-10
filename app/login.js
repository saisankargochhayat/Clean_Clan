var express = require('express');
var path = require('path');
var User = require('../model/user');
//create our router object
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
				if(user.password == req.body.password){
					req.session.email = user.email;
					res.send("Success")
					// res.redirect('/profile');
				}
				else{res.send("entered wrong password");
					}

			}
		});
	};

});
