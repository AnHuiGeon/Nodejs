const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { Group } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => { // localhost:8005/groupInfo/ 화면을 띄운다.
  Group.findAll({}) // group테이블에 있는 정보를 전부 찾는다.
  .then((groups) => {
    res.render('groupInfo', {   // 찾으면 아래 데이터와 함께 groupInfo.pug로 보낸다.
      title: '조원 소개', 
      user: req.user, 
      groups
    });
  })
  .catch((err) => { // 에러 발생 시 콘솔창에 에러 출력
    console.error(err);
  })
});

router.get('/:id', (req, res) => {  // 
  const id = req.params.id;
  Group.find({
    where: {id},
  })
  .then((groups) => {
    console.log(groups);
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
