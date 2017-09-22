var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//middleware
var index = require('./routes/index');
var users = require('./routes/users');
var cheerio = require('./interface/cheerio');
var register = require('./interface/register');
var login = require('./interface/login');
var rating = require('./interface/rating');
var fed = require('./interface/fed');
var collect = require('./interface/collect');
var upload = require('./interface/upload');
var chat =require('./interface/chat');
var logout = require('./interface/logout');
var message = require('./interface/message');
var robotapi = require('./interface/robot');

//mongodb
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')({session:session});


var app = express();

mongoose.connect("mongodb://localhost:27017/vue");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    resave:false,//添加这行
    saveUninitialized: true,//添加这行
    secret:'abcdef',
    cookie:{maxAge:60*60*1000},
    store:new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use('/', index);
app.use('/users', users);
app.use('/restful/cheerio',cheerio);
app.use('/restful/register',register);
app.use('/restful/login',login);
app.use('/restful/rating',rating);
app.use('/restful/fed',fed);
app.use('/restful/collect',collect);
app.use('/restful/upload',upload);
app.use('/restful/chat',chat);
app.use('/restful/logout',logout);
app.use('/restful/message',message);
app.use('/restful/robotapi',robotapi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
