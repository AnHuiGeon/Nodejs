const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { Comment, Question } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    try {
      Question.findAll({})
        .then((questions) => {
        res.render('question', { title: '질의응답', user: req.user,
        // render는 question.pug로 하고 안의 값(title, user, questions)를 보내준다.
        questions});
      }) 
    } catch (error) {
      res.render('question', { title: '질의응답 - ERROR', user: req.user});
    }
  });
  
  
  router.post('/', (req, res) => {
    const {question} = req.body;
    Question.create({
      question
    })
    res.redirect('/question');  // redirect()는 안의 url주소의 GET으로 간다.
  });
  
  router.patch('/', (req,res) => {
    const {id, new_question} = req.body;
    Question.update({question : new_question}, 
    {where : {id : id}})
    .then(()=> {
      res.json();
      // res.send(); // res.send()로 해도 무방하다.
    })
  })
  
  router.delete('/:id', async (req,res) => {
    const {id} = req.params;
    await Comment.destroy({where : { questioner : id}})
    await Question.destroy({ where: { id: id} })
    .then(() => {
      res.json();
    })  
  })

module.exports = router;