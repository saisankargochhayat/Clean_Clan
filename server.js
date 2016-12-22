/////////////////////  EXPRESS //////////////////
//require our dependencies
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session')
var multer = require('multer');
var serveIndex = require('serve-index')
var body_parser = require('body-parser');


mongoose.connect('mongodb://localhost/tcs');
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("connection established to db");
  });
// var formidable = require('express-formidable')
var app = express();
var port = 3000;

//route our app
var router = require('./app/routes');
var signup = require('./app/signup');
var login = require('./app/login');
var profile = require('./app/profile');
var timeline = require('./app/timeline');
var post = require('./app/post');
var leaderboard =require('./app/leaderboard');
var issues =require('./app/issues');
var report = require('./app/report');


//set static files(css or js or imgs)
app.use(express.static(__dirname + "/public"));
app.use('/uploads', serveIndex('public/uploads'));

app.use(body_parser.json({limit:'10mb'}));
app.use(body_parser.urlencoded({extended:true}));
// app.use(formidable());


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
app.use('/post',post);
app.use('/leaderboard',leaderboard);
app.use('/issues',issues);
app.use('/report',report);

//start your server
app.listen(port,function(){
	console.log('App started')
});
