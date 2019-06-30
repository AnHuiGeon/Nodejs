const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { Group } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  Group.findAll({})
  .then((groups) => {
    res.render('groupInfo', {
      title: '조원 소개',
      user: req.user,
      groups
    });
  })
  .catch((err) => {
    console.error(err);
  })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Group.find({ where: {id} })
  // 동일한 id를 가지는 조원을 찾아낸다.
  .then((groups) => {
    res.json({groups});
  })
  .catch((err) => {
    console.error(err);
  })
});

router.patch('/', (req, res) => {
  const { age, license, introduce, id} = req.body;
  Group.update({
     age, license, introduce},
    { where: { id } })
    .then(() => {
    res.json();
  })
})

module.exports = router;