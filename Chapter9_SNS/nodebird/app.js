const express = require('express'); // express모듈을 import해서 객체로 express변수에 대입.
const cookieParser = require('cookie-parser');  // cookie-parser모듈을 import해서 객체로 cookieParser에 대입.
const morgan = require('morgan');   // morgan모듈을 import해서 객체로 morgan변수에 대입.
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');   // passport 모듈을 import해서 객체로 passport변수에 대입해 둔다.
require('dotenv').config(); // npm i dotenv -> .env(COOKIE_SECRET=nodebirdsecret) 한 후 작성, .env만 유출되지 않게 관리하라

const pageRouter = require('./routes/page');    // routes폴더에 page.js파일 작성
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const {sequelize} = require('./models');    // models/index.js임포트

const passportConfig = require('./passport');   // p.367의 index.js를 만들어야 한다.
// ./passport.js의 (passport) => {} 화살표 함수 안의 내용들이다.

const app = express();
sequelize.sync();   // DB와 동기화
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: true,
    seveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(flash());
// passport는 session()미들웨어 다음에 작성해야 함.
app.use(passport.initialize()); // 초기화 하면서 req.passport속성이 작성된다.
app.use(passport.session());    // req.session객체에 passport정보를 저장한다. 세션 관리

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});