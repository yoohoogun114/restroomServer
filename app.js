'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var Sequelize = require('sequelize');
const DbService = require('./lib/service/dbService');
const dbService = new DbService({
    dbName: 'restroomdb',
    dbLogging: 'true',
    dbUsername: 'yuhogyun',
    dbPassword: 'ghrbsdl114'
});
var cors = require('cors');
//console.log(dbService.getSequelize() == dbService);

exports.dbService = dbService;
//console.log(exports.dbService);
//console.log(module);
var routes = require('./routes/index');
var jsonfile = require('jsonfile');


var app = express();
app.use(cors({
    origin: '*'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

const DbModel = require('./lib/service/dbModel');

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

//console.log(module);

//DB Init
dbService.sync();
