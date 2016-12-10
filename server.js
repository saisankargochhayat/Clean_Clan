/////////////////////  EXPRESS //////////////////
//require our dependencies
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session')
mongoose.connect('mongodb://localhost/tcs');
var app = express();
var port = 3000;
var body_parser = require('body-parser');
//route our app
var router = require('./app/routes');
var signup = require('./app/signup');
var login = require('./app/login');

//set static files(css or js or imgs)
app.use(express.static(__dirname + "/public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.use(session({
  secret: 'tcshack',
  resave: false,
  saveUninitialized: true
}))


//express middlewire which have access to all our routes
app.use('/',router);
app.use('/signup',signup);
app.use('/login',login);



//start your server
app.listen(port,function(){
	console.log('app started')
});
