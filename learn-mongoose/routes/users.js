var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {  // 요청 방식과 URL : GET /users/
  User.find({}) // 요것이 성공 : then, 실패 : catch
  .then((users) => {  // mongoose에서 받아야한다.
    res.json(users);  // mongoose.js의 getUser() 안에 있다.
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

router.post('/', (req, res, next) => {  // POST /users/
  const user = new User({ // 객체의 정보를 담는다.
    name: req.body.name,
    age: req.body.age,
    married: req.body.married
  });
  user.save()
  .then((result) => {
    console.log(result);
    res.status(201).json(result);   // <- 아래 두 줄을 요로코롬 하나로 만들었따
    // res.status(201); res.json(result);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
