const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Group, User } = require('../models');

const router = express.Router();

router.post('/group', isLoggedIn, async (req, res, next) => {
  const { name } = req.body;
  try{
    const exGroup = await Group.find({where: { name }});
    if(exGroup){
      req.flash('groupError', '중복된 이름입니다.');
      return res.redirect('/main');
    }
    await Group.create({
      name,
    });
    return res.redirect('/main');
  } catch(error) {
    console.error(error);
    return next(error);
  }
});

//회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => { //join.pug에서 submit버튼 누르면 post 방식으로 /auth/joind 넘어옴
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.find({ where: { email } });   //email 값이 있는 모든 user 정보 가져옴
    if (exUser) {
      req.flash('joinError', '가입된 이메일입니다.');
      return res.redirect('/join');
    }
    const hash = await bcrypt.hash(password, 12);   //비밀번호 암호화
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/'); // '/' = page.js   redirect는 get
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect('/join');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/join');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {   //세션을 비워줌
  req.logout();           //req.user 객체를 제거
  req.session.destroy();  //req.session 객체의 내용을 제거
  return res.redirect('/');     //세션 정보를 지운 후 메인으로 돌아감
});

module.exports = router;
