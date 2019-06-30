var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {    // 요청 방법과 요청 URL : 'GET'과 '/' 일때
  // res.render('index', { title: 'Express' });
  User.find({})   // 모든 유저들을 조사해서 가져와준다. 이 함수가 성공하면 -> 밑의 .then으로 간다. Promise 구조
  .then((users) => {  // 성공 하면!
    res.render('mongoose', { users });    // mongoose.pug의 users객체를 전달해서 view를 만든다.
  })
  .catch((err) => { // 실패 하면!
    console.error(err);
    next(err);
  });
});

// // async/await 구조
// router.get('/', async (req, res, next) => {
//   try{
//     const users = await User.find({});
//     res.render('mongoose', {users});
//   }catch(err){
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
