var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');

// Routers for customer
var customerRegisterRouter = require('./routes/customer/register_customer');
var deleteCustomerRouter = require('./routes/customer/delete_customer');
var updateCustomerRouter = require('./routes/customer/update_customer');
var customerLoginRouter = require('./routes/customer/customer_login');
var getCustomerRouter = require('./routes/customer/get_customer');

// Routers for product
var createProductRouter = require('./routes/product/create_product');
var updateProductRouter = require('./routes/product/update_product');
var deleteProductRouter = require('./routes/product/delete_product');
var getProductRouter = require('./routes/product/get_product');
var getProductsRouter = require('./routes/product/get_products');

// Routers for employee
var employeeRegisterRouter = require('./routes/employee/register_employee');
var updateEmployeeRouter = require('./routes/employee/update_employee');
var employeeLoginRouter = require('./routes/employee/employee_login');
var deleteEmployeeRouter = require('./routes/employee/delete_employee');
var getEmployeeRouter = require('./routes/employee/get_employee');

// Router for order
var createOrderRouter = require('./routes/order/create_order');
var deleteOrderRouter = require('./routes/order/delete_order');
var getStoreOrdersRouter = require('./routes/order/get_store_orders');

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

// Enpoints for customer
app.use('/customer-register', customerRegisterRouter);
app.use('/delete-customer', deleteCustomerRouter);
app.use('/update-customer', updateCustomerRouter);
app.use('/customer-login', customerLoginRouter);
app.use('/get-customer', getCustomerRouter);

// Endpoints for product
app.use('/create-product', createProductRouter);
app.use('/update-product', updateProductRouter);
app.use('/delete-product', deleteProductRouter);
app.use('/get-product', getProductRouter);
app.use('/get-products', getProductsRouter);

// Enpoints for employee
app.use('/employee-register', employeeRegisterRouter);
app.use('/update-employee', updateEmployeeRouter);
app.use('/employee-login', employeeLoginRouter);
app.use('/delete-employee', deleteEmployeeRouter);
app.use('/get-employee', getEmployeeRouter);

// Endpoints for order
app.use('/create-order', createOrderRouter);
app.use('/delete-order', deleteOrderRouter);
app.use('/get-store-orders', getStoreOrdersRouter);

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
