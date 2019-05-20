var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');
var sequelize = require('./models').sequelize;  //require('./models/index') 까지 하지 않아도 ㄱㅊㄱㅊ 생략 가능

var app = express();
sequelize.sync(); //이걸로 DB서버와 연결되어 연동 가능.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));  //미들웨어, 정적파일, 가능한 속도를 빠르게 하기 위해 순서를 바꿈(기존은 23번 단락에 있었다.)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());    // cookie를 다루기 위해 객체화 시킨다.

//26~28 -> 라우팅을 걸어두었다.
app.use('/', indexRouter);    // 요청이 '/'로 왔을 때
app.use('/users', usersRouter);   //요청이 '/users'로 왔을 때
app.use('/comments', commentsRouter);    // 요청이 '/comments'로 왔을 때 comments에 대한 미들웨어를 사용하겠다.

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
