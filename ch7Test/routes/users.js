var express = require('express');
var router = express.Router();
const User = require('../models').User;
// const { User } = require('../models').User;

/* GET users listing. */
router.get('/', function(req, res, next) {  // GET방식에 url은 /users/
  User.findAll().then((users) => {
    res.json(users);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});
// res.render('sequelize', {users});

router.post('/', async (req, res, next) => {  // POST방식에 url은 /users/
  User.create({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  }).then((result) => {
    console.log(result);
    res.status(201).json(result);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
