var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

// RESTful 서버 구현
router.get( // GET /comments/아이디값
    '/:id', // get방식으로 해당하는 url을 요청하면
    (req, res, next) => {
        Comment.find({commenter:req.params.id}).populate('commenter')  // 연결해준다. mongoDB commenter:필드에는 값만 있는데, 이놈이 저놈인지 알 수 있게 해준다. foreign key로 되어 있는것도 보여주는 join 느낌이다.                                                                // ../schemas/comments.js의 ref:'User'
        .then((comments) => {
            console.log(comments+'??????');
            res.json(comments);     // 얘를 호출한 곳은 mongoose.js의 
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
    });

router.post('/', (req, res, next) => {
    const comment = new Comment({
        commenter : req.body.id,
        comment: req.body.comment,
    });
    comment.save()
    .then((result) => {
        return Comment.populate(result, { path : 'commenter' });
    })
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
});

router.patch('/:id', (req, res, next) => {
    Comment.update({ _id : req.params.id }, { comment : req.body.comment })
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    Comment.remove({ _id : req.params.id })
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
});

module.exports = router;
// p.339