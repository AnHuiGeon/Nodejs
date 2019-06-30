const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/', (req, res, next) => {
  User.findAll({
    id : 'id',
    nick: 'nick',
    order: [['createdAt', 'DESC']],
  })
    .then(() => {
      res.render('layout', {
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