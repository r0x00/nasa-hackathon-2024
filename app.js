const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

require('dotenv').config();
app.set('TOMTOM_KEY', process.env.TOMTOM_KEY);

app.use(express.static(__dirname + '/views'));
app.use(express.static('node_modules'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const routesView = require('./routes/routes-view');
app.use('/', routesView);

const routesRestful = require('./routes/routes-restful');
app.use('/api', routesRestful);



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


// console.log(map)

module.exports = app;
