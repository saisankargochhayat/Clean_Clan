/////////////////////  EXPRESS //////////////////
//require our dependencies
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session')
mongoose.connect('mongodb://localhost/tcs');
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("connection established to db");
  });

var app = express();
var port = 3000;
var body_parser = require('body-parser');
//route our app
var router = require('./app/routes');
var signup = require('./app/signup');
var login = require('./app/login');
var profile = require('./app/profile');
var timeline = require('./app/timeline');


//set static files(css or js or imgs)
app.use(express.static(__dirname + "/public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.use(session({
  secret: 'tcshack',
  resave: false,
  saveUninitialized: true
}))

//setup ejs
app.set('view engine','ejs');
app.set('views',__dirname+'/views')


//express middlewire which have access to all our routes
app.use('/',router);
app.use('/signup',signup);
app.use('/login',login);
app.use('/profile',profile);
app.use('/timeline',timeline);


//start your server
app.listen(port,function(){
	console.log('App started')
});
