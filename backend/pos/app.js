var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRegisterRouter = require('./routes/register_customer');
var deleteCustomerRouter = require('./routes/delete_customer');
var updateCustomerRouter = require('./routes/update_customer');
var customerLoginRouter = require('./routes/customer_login');
var createProductRouter = require('./routes/create_product');
var updateProductRouter = require('./routes/update_product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customer-register', customerRegisterRouter);
app.use('/delete-customer', deleteCustomerRouter);
app.use('/update-customer', updateCustomerRouter);
app.use('/customer-login', customerLoginRouter);
app.use('/create-product', createProductRouter);
app.use('/update-product', updateProductRouter);

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
