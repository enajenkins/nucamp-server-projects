var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

var app = express();



/* ------ 2. Exercise: REST API with Express, MongoDB, and Mongoose Part 1: Update the Express application ------ */

const mongoose = require('mongoose');

// connect to the nucampsite database on the MongoDB server
// const url = 'mongodb://localhost:27017/nucampsite';
const url = 'mongodb://localhost:27017/nucampsite';
// mongoose.connect() is a wrapper around the MongoDB node driver's connect method. it's similar to the way we connected before, but with added Mongoose functionality
// the first arg is the url, the second is an object with options settings. we are setting the options below to deal with some MDB driver deprecations
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// the connect method automatically returns a promise, therefore, you can chain promise methods like .then() and .catch() to it.
connect.then(() => console.log('Connected correctly to server'), 
    err => console.log(err)
);






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use() specifies middleware as the callback function and mounts it ()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

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

// more info: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
// https://www.npmjs.com/package/nodemon
