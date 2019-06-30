const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Comment, Question, Group, User } = require('../models');

const router = express.Router();

router.get('/main', isLoggedIn, (req, res) => {
  res.render('main', { title: '현지학기 프로그램 소개 페이지', user: req.user });
});

router.get('/view3', (req, res) => {
  try {
    Question.findAll({})
      .then((questions) => {
        res.render('view3', {
          title: '질의응답', user: req.user,
          questions
        });
      })
  } catch (error) {
    res.render('view3', { title: '질의응답 - ERROR', user: req.user });
  }
});
router.post('/view3', (req, res) => {
  const { question } = req.body;
  Question.create({
    question
  })
  res.redirect('/view3');
});
router.get('/comment', (req, res) => {
  const { question, id } = req.body;
  try {
    Comment.find({
      where: { questioner: id }
    })
      .then((comments) => {
        res.render('comment', {
          title: '답변',
          user: req.user, question,
          comments
        });
      })
  } catch (error) {
    res.render('comment', {
      title: '답변 - ERROR', user: req.user
      , question
    });
  }
});

router.post('/comment', async (req, res) => {
  const { question, id, comment } = req.body;
  if (comment) {
    Comment.create({ comment, questioner: id });   //외래키 찾기
  }
  try {
    await Comment.findAll({
      where: { questioner: id },
    }).then((comments) => {
      res.render('comment', {
        title: '답변', user: req.user
        , question, id, comments
      })
    })
  } catch (error) {
    console.log(error);
    res.render('comment', {
      title: '답변 - ERROR', user: req.user
      , question, id
    });
  }
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/', (req, res, next) => {
  User.findAll({
    id: 'id',
    nick: 'nick',
    order: [['createdAt', 'DESC']],
  })
    .then(() => {
      res.render('main', {
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


/*
Group.findAll()
    .then((groups) => {
      res.render('main', {groups});
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });

*/