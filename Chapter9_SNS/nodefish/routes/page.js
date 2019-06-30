var router = require('express').Router();

router.get('/profile', (req, res) => {
    res.render('profile', { title: '내 정보 - NodeFish', user: null });
});

router.get('/join', (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeFish',
        user: null,
        joinError: req.flash('joinError'),
    });
});

router.get('/', (req, res, next) => {
    res.render('main', {
        title: 'NodeFish',
        twits: [],
        user: null,
        loginError: req.flash('loginError'),
    });
});

module.exports = router;