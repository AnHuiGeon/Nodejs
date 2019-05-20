var express = require('express');
var router = express.Router();

var User = require('../models').User;  // 구체적으로 User에 대한것만 가져온다.
// const {User} = require('./models);

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll()
  .then((users) => {    //Promise
    res.render('sequelize', { users });   //views안에 sequelize.pug파일에 users를 가지고 render하라
  })
  .catch((err) => {
    console.error(err);
    next(err); //이걸 만나면 다음 라우터로 넘긴다.
  });
});


// router.get('/', async function(req, res, next) {  // async await
//   try{
//     const users = await User.findAll();
//     res.render('sequelize', {users});
//   }catch(err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
