var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');
// var connect = require('./schemas');     // ??

var mongo_connect = require('./schemas'); // ./schemas/index.js   connect 변수는 3번째 단락의 화살표 함수가 된다.

var app = express();
mongo_connect();    //mongodb의 model과 연결한다. schemas/index.js를 app.js와 연결하여 노드 실행 시 mongoose.connect 부분도 실행되도록 함

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));        // 실행의 준비상태 향상! js파일의 속도를 빠르게 하기 위해 위로 올렸따! 사실 얘는 한 3~4칸 밑에 있었걸랑요!
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

app.listen();

module.exports = app;
