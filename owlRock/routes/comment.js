const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { Comment } = require('../models');

const router = express.Router();

router.get('/:id', isLoggedIn, (req, res) => {
    const { id } = req.params;  // params: { id: '10' }
    console.log(req);
    const question = req.param('question', '??'); // query: { question: '김민석은 변태?', id: '10' }
    try {
      Comment.findAll({
        where : {questioner : id}
      })
        .then((comments) => {
        res.render('comment', { 
          title: '답변', 
          user: req.user, question, id,
          comments});
      })
    } catch (error) {
      console.error(error);
    }
  });
  
  router.post('/:id', async (req, res) => {
    const { id,  comment, question } = req.body;
    try {
      await Comment.create({comment, questioner : id});
      await res.redirect('/comment/' + id +'?question=' + encodeURIComponent(question));  // encodeURIComponent(question) => question이 한글일 경우 uri에 보낼 때 변환 해주는 작업
      // GET /comment/10?question=%EA%B9%80%EB%AF%BC%EC%84%9D%EC%9D%80+%EB%B3%80%ED%83%9C%3F&id=10
    } catch (error) {
      console.log(error);    
    }
  });
  
  router.patch('/', async (req, res) => {
    const {comment, id} = req.body;
    await Comment.update({
      comment: comment
    },{where: { id: id }
    }).then(()=> {
      res.json();
    })
  })

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Comment.destroy({where: { id }})
    .then(()=> {
      res.send();
    })
  })
  
module.exports = router;