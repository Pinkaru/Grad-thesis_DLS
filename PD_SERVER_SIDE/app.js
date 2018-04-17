var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventRouter = require('./routes/events');
var getTest = require('./routes/getTest');
var dlsPdRouter = require('./routes/DLS_PD');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 뷰 엔진 html 변경
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//xml 파일 저장 경로
app.use('xml', express.static('xml'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//SSE 이벤트 경로(GET)
app.use('/events', eventRouter);

//GET test
app.use('/get_test', getTest);

//PD event
//app.use('/pd',dlsPdRouter);

app.enable('trust proxy');
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
