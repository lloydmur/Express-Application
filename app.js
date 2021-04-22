var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const keys = require('./public/config/keys')
//the following runs passport setup allowing use of auth startegy
const passportSetup = require('./public/config/auth');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var postsRouter = require('./routes/posts');
var authRouther = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//allows use of url encoded data such as forms
app.use(express.urlencoded({ extended: false }));
//use of cookies
app.use(cookieParser());
//use of static files
app.use(express.static(path.join(__dirname, 'public'))); 

//session setup 
app.use(session({
  secret: keys.session.secret,
  resave: true,
  saveUninitialized: true 
}))
//passport setup GOES BEFORE adding route to middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/posts', postsRouter);
app.use('/auth', authRouther);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
