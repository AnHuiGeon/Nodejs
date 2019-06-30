const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Comment, Question, Group, User } = require('../models');

const router = express.Router();

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird', user: req.user });
});

router.post('/profile', async (req, res, next) => {
  const { users } = req.body;
  Group.find({
    where: {name : users},
  }).then((group) => {
    res.render('profile', {
      user: req.user, 
      group : group,
    });
  });
});

router.get('/main', isLoggedIn, (req, res) => {
  res.render('main', { title: '내 정보 - NodeBird', user: req.user });
});

router.get('/view3', (req, res) => {
  try {
    Question.findAll({})
      .then((questions) => {
      res.render('view3', { title: '내 정보 - NodeBird', user: req.user,
      questions});
    }) 
  } catch (error) {
    res.render('view3', { title: '내 정보 - NodeBird', user: req.user});
  }
});
router.post('/view3', (req, res) => {
  const {question} = req.body;
  Question.create({
    question
  })
  res.redirect('/view3'); // 바로 위의 get('/view3')으로 간다. -> 다시 DB탐색 후 화면에 render
});
router.get('/comment', (req, res) => {    // 일단 사용하지 않음(지금은~!)
  const {question, id } = req.body;
  try {
    Comment.find({
      where : {questioner : id}
    })
      .then((comments) => {
      res.render('comment', { 
        title: '내 정보 - NodeBird', 
        user: req.user, question, comments});
    }) 
  } catch (error) {
    res.render('comment', { title: '내 정보 - NodeBird', user: req.user
  ,question});
  }
});
router.post('/comment', async (req, res) => {
  const {question, id,  comment } = req.body;
  if(comment){
    await Comment.create({comment, questioner : id}); //questioner -> foreign key
  }
  try {
    await Comment.findAll({
      where: {questioner: id},
    }).then((comments)=> {
      res.render('comment', { title: '내 정보 - NodeBird', user: req.user
      ,question, id, comments})
    })
  } catch (error) {
    console.log(error);
      res.render('comment', { title: '내 정보 - NodeBird', user: req.user
      ,question, id});
    }
});



router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeBird',
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

module.exports = router;    // router변
