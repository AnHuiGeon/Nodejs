var express = require('express');

var {User, Comment} = require('../models');

var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  Comment.findAll({ // GET /comments/:id
    include: {  //User와 req.params.id에 대한 내용을 조인??한다...!!!!
      model: User,
      where: {id: req.params.id},
    },
  }).then((comments) => {
    console.log(comments);
    res.json(comments); //sequelize.json으로 넘어간다.
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});

router.post('/', function(req, res, next){  // POST /comments/
  Comment.create({
    commenter: req.body.id,
    comment: req.body.comment,
  }).then((result) => { // 결과는 result로 나타날것이며 콜백으로 표현할거다.
    console.log(result);
    res.status(201).json(result);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});

router.patch('/:id', function(req, res, next){ // PATCH /comments/:id
  Comment.update({comment: req.body.comment},
    {where: {id: req.params.id}
  }).then((result) => {
    res.json(result);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
})

router.delete('/:id', function(req, res, next){ // DELETE /comments/:id
  Comment.destroy({where: {id: req.params.id}
  }).then((result) => {
    res.json(result);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
})

module.exports = router;