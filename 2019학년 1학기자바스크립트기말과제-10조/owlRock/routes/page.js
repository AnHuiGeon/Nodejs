const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    // title: '회원가입', // 필요 없음
    // user: req.user,
    joinError: req.flash('joinError'),
    // req.flash(키) 로 해당 키에 대한 값을 불러옴
    // ./routes/auth.js => req.flash('loginError', info.message); 에서 key, value 대입
  });
});

router.get('/', (req, res, next) => {
  res.render('layout', {
    user: req.user,
    loginError: req.flash('loginError'),
  });
  // User.findAll({  // User.findAll할 필요 없음.
  //   id : 'id',
  //   nick: 'nick',
  //   order: [['createdAt', 'DESC']],
  // })
  //   .then(() => {
  //     res.render('layout', {
  //       user: req.user,
  //       loginError: req.flash('loginError'),
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     next(error);
  //   });
});

module.exports = router;
// 라우터 모듈화