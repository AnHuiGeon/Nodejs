var express = require('express');
var { User, Comment } = require('../models');

var router = express.Router();

router.post('/', (req, res, next) => {
    const { id, name, age, comment } = req.body;
    if(comment){    // comment가 있을 때
        Comment.create({
            commenter: id, comment
        });
        res.redirect('/');
    }else{          // comment가 없을 때
        User.findAll()
        .then((users) => {
            Comment.findAll({
                where : { commenter: id }
            })
            .then((comments) => {
                res.render('sequelize', {
                    comments, users
                });
            });
        });
    }
});

module.exports = router;
