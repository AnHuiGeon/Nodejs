const express = require('express');
// express내장모듈 express변수에 대입
const cookieParser = require('cookie-parser');
// cookie-parser미들웨어 : 요청에 동봉된 쿠키를 해석
// 쿠키 : 단순한 '키-값'의 쌍, 서버는 요청에 대한 응답을 할 때 쿠키를 같이 보냄
// 쿠키는 요청(req)과 응답(res)의 헤더(header)에 저장. req와 res는 각각 헤더와 본문(body)을 가짐
const morgan = require('morgan');
// morgan미들웨어 : 요청에 대한 정보를 콘솔에 기록, 아래에 함수의 인자로 dev사용
const path = require('path');
const session = require('express-session');
// express-session미들웨어 : 세션 관리용 미들웨어
const flash = require('connect-flash');
const passport = require('passport');
// passport 모듈
require('dotenv').config();
// .env 파일의 비밀키들을 읽어 process.env객체에 넣는다.
// 이후로 process.env.COOKIE_SECRET처럼 키 사용 가능.

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const GroupInfoRouter = require('./routes/groupInfo');
const QuestionRouter = require('./routes/question');
const CommentRouter = require('./routes/comment');
const SemesterInfoRouter = require('./routes/semesterInfo');
const { sequelize } = require('./models');    // ./models/index.js
const passportConfig = require('./passport'); // ./passport/index.js

const app = express();  // express객체를 app변수에 대입
sequelize.sync();
passportConfig(passport); // index.js에 passport객체를 넣는다.

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8005);

// 미들웨어는 app.use()메서드로 app에 장착 한다.
app.use(morgan('dev'));
// GET / 200 51.267 ms -1539와 같이 로그에 띄움
// HTTP요청(GET) 주소(/) HTTP상태코드(200) 응답속도 (51.267ms) - 응답바이트(1539)
app.use(express.static(path.join(__dirname, 'public')));
// static미들웨어 : 정적인 파일들을 제공, express에 내장되어 있는 미들웨어
// 함수의 인자로 정거 파일들이 담겨 있는 폴더를 지정하면 된다 => (path.join(__dirname, 'public'))
// __dirname : 현재 폴더(디렉토리)의 경로 ../owlRock
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  // resave : 요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
  saveUninitialized: false,
  // 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정
  secret: process.env.COOKIE_SECRET,
  // secret : 필수 항목, cookie-parser의 비밀 키와 같은 역할
  // express-session은 세션 관리시 클라이언트에 쿠키를 보냄. => 세션 쿠키
  // 안전한 쿠키 전송을 위해 쿠키에 서명을 추가(secret)하고 서명하는데 secret의 값이 필요.
  // cookie-parser의 secret값과 같게 설정해야함.(process.env.COOKIE_SECRET)
  cookie: { // 세션 쿠키에 대한 설정
    httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하게 함.
    secure: false,  // https가 아닌 환경에서도 사용할 수 있게 함.
  },
}));
app.use(flash()); // req객체에 req.flash메서드를 추가
// req.flash(키, 값)으로 해당 키에 값을 설정
// req.flash(키) 로 해당 키에 대한 값을 불러옴
app.use(passport.initialize());
// passport.initialize() 미들웨어는 요청(req 객체)에 passport 설정을 심는다.
//res에 passport 설정
app.use(passport.session());
// passport.session() 미들웨어는 req.session 객체에 passport 정보를 저장
//req.session 객체에 passport 정보 저장

// 라우터도 일종의 미들웨어이므로 app.use()를 사용한다.
// use메서드는 모든 HTTP메서드에 대해 요청 주소만 일치하면 실행
app.use('/', pageRouter); // './routes/page'
app.use('/auth', authRouter); // './routes/auth'
app.use('/groupInfo', GroupInfoRouter); // './routes/groupInfo'
app.use('/question', QuestionRouter); // './routes/question'
app.use('/comment', CommentRouter); // './routes/comment'
app.use('/semesterInfo', SemesterInfoRouter); // './routes/semsterInfo'

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);  // 에러 핸들러로 이동한다.
});

// 에러 핸들러
app.use((err, req, res, next) => {  // next함수의 err인자와 err매개변수로 연결
  res.locals.message = err.message; // 로그인 시 
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// port 대기 상태 출력
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});