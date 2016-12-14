//require express
var express = require('express');
var path = require('path');
var User = require('../model/user');
//create our router object
var router = express.Router();

//export our router
module.exports = router;


var auth = function(req, res, next) {
	if (req.session && req.session.email)
		return next();
	else
		return res.redirect('/login');
};
router.get('/',auth,function(req,res,next){
	if(req.session && req.session.email){
		User.findOne({email:req.session.email},function(err,user){
			if(err){
				console.log(err);
				res.send(err);
			}
			else{
				res.render('./pages/profile',{
					title:"Clean India",
					name:user.name,
					email:user.email,
					location:user.city,
					image:user.image,
					image_type:user.image_type
				});
			}
		});
	}
})
