const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
// const isLogincheck = require('./middlewares').isLoggedIn;
// const isNotLoginCheck = require('./middlewares').isNotLoggedIn;
const {User} = require('../models');

const router = express.Router();

router.post('/join', // POST 요청 /auth/join
    isNotLoggedIn,
    async (req, res, next) => {
        const {email, nick, password} = req.body;
        // const email = req.body.email;
        // const nick = req.body.nick;
        // const password = req.body.password;
        try{
            const exUser = await User.findOne({where : {email}});
            if(exUser){ // 이미 가입한 사용자 존재함.
                req.flash('joinError', '이미 가입한 사용자 이메일 입니다.');
                return res.redirect('/join');   // page.js의 GET '/join'으로 간다.
            }
            const hash = await bcrypt.hash(password, 12);   // 12: 12번 반복해서 암호화
            // 12~31 값 설정하는걸 추천, 값이 높을수록 속도 늦어짐.
            await User.create({
                email, nick, password: hash
                // email:email, nick:nick, password: hash
            });
            return res.redirect('/');
        }catch(err){
            console.error(err);
            return next(err);   // app.js의 404에러나 500에러같은 곳이 적힌 곳으로 던진다.(error pug가 실행되도록.)
        }
    }
);
router.post('/login', // POST 요청 /auth/login
    isNotLoggedIn, 
    (req, res, next) => {
        passport.authenticate(
            'local',
            (authErr, user, info) => {  // localStrategy.js의 done함수 참고
                if(authErr) {
                    console.error(authErr);
                    return next(authErr);
                }
                if(!user) {
                    req.flash('loginError', info.message); // 메시지는 auth.js의 
                    return res.redirect('/');
                }
                // req.login(): passport모듈의 메서드
                return req.login(user, (loginErr) => {
                    if(loginErr){
                        console.error(loginErr);
                        return next(loginErr);
                    }
                    return res.redirect('/');   // 로그인 화면은 if, else로 로그인 여부를 가른다.
                });
            }
        )(req, res, next);  // passport.authenticate()가 미들웨어 역할을 하기 때문 => 미들웨어 형태로 호출해야 한다.
    }
);
router.get('/logout', // POST 요청 /auth/logout
    isLoggedIn,
    (req, res) => {
        req.logout();   // passport모듈의 메서드. req.user정보 삭제
        req.session.destroy();  // req.session객체 정보 삭제
        res.redirect('/');  // join.pug에서 user객체 정보가 사라지므로 if, else문에서 else문으로 열린다.
    }
);
router.get('/kakao', // 카카오톡으로 로그인 시도하는 라우팅
passport.authenticate('kakao')
);
// /auth/kakao/callback 라우터 작성해야함
router.get('/kakao/fallback',   
//카카오톡 로그인 성공시 호출되는 콜백 라우팅
passport.authenticate('kakao',{
    failureRedirect:'/',
}),(req,res) => {
    res.redirect('/');
});

module.exports = router;