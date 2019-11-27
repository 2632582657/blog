var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require("cors");
var env=require('./utils/env')
// var bodyParser=require('body-parser');
var md5 = require('md5');


var index = require('./routes/index');

var app = express();
app.use(cors({
  origin:env.cors,
  credentials:true
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(session({
  secret:"sjlk",
  cookie:{
    maxAge:259200000
  },
  resave:false,
  saveUninitialized:true
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
