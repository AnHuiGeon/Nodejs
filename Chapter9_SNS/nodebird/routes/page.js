const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// const isLogincheck = require('./middlewares').isLoggedIn;
// const isNotLoginCheck = require('./middlewares').isNotLoggedIn;
const { Post, User } = require('../models');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird', user: req.user });
    // req.user는 passport모듈이 로그인 완료되면 req객체에 저장해 주는 객체
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeBird',
        user: req.user,
        joinError: req.flash('joinError'),
    });
});

router.get('/', (req, res, next) => {
    Post.findAll({
        include: {
            model: User,
            attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']],
    })
    .then((posts) => {
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
            user: req.user,
            loginError: req.flash('loginError'),
        });
    })
    .catch((error) => {
        console.error(error);
        next(error);
    });
});

module.exports = router;