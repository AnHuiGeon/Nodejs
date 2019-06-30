const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Comment, Question, Group, User } = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
    Group.findAll()
      .then((groups) => {
        res.render('profile', { title: '10조 조원 소개', groups });
      })
      .catch((err) => {
        console.error(err);
      })
    // Group.findAll({
    // })
    // .then((groups) => {
    //   res.render('profile', {
    //     title: '조원 소개',
    //     user: req.user,
    //     groups
    //   });
    // })
    // .catch((err) => {
    //   console.error(err);
    // })
  });
  
  router.post('/', async (req, res, next) => {
    // const { group } = req.body;
    Group.create({ name, age, introduce, license, img });
    res.redirect('/profile');
    // Group.find({
    //   where: {name : users},
    // }).then((group) => {
    //   res.render('profile', {
    //     user: req.user, 
    //     group : group,
    //   });
    // })
    // .catch((error) => {
    //   console.error(err);
    // });
  })

router.get('/:id', (req, res, next) => {
    Group.findOne({
        where: {id: req.params.id},
    }).then((group) => {
        console.log(group);
        // res.render('profile', {title: req.params.id, groups});
        res.json(group);
    }).catch((err) => {
        console.log(err);
        next(err);
    });
});

module.exports = router;