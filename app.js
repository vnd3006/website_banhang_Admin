const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin');
const orderRouter = require('./routes/order');
const reportRouter = require('./routes/report');

const session = require('express-session')
const passport = require('./auth/passport')
const auth = require('./auth/authRouter')
const flash = require('express-flash')

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const blocks = {};

hbs.registerHelper('extend', function(name, context) {
  const block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  const val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash())
app.use(session({ secret: "cats" }))
app.use(passport.initialize());
app.use(passport.session());


app.use(function (req, res, next) {
  res.locals.user = req.user
  // res.locals.authenticated = !req.user.anonymous
  next()
})

app.use('/admin', adminRouter);
app.use('/',auth, indexRouter);
app.use('/users',auth, usersRouter);
app.use('/product',auth, productRouter);

app.use('/order',auth, orderRouter);
app.use('/report',auth, reportRouter);


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
