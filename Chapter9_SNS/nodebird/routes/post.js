const express = require('express');
const multer = require('multer'); // multipart/form-data처리
const path = require('path');
const fs = require('fs');

const {Post, Hashtag, User} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();
fs.readdir('uploads', (error) => {
    if(error) {
        console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');    // 동기화(동기식 작동), 이 폴더를 생성 후 다음 코드가 진행됨.
    }
});

const upload = multer({
        storage: multer.diskStorage({
            destination(req, file, cb){
                cb(null, 'uploads/');
            },
            filename(req, file, cb){
                // abc.jpg : file.originalname
                // ext => jpg
                // path.basename의 결과: abc
                // abc+업로드되는 날짜문자열 + ext
                // abc201906111235.jpg
                const ext = path.extname(file.originalname);
                cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },   // 5M bytes
    });
router.post('/img', isLoggedIn,
    upload.single('img'),   // single, array, fields, none p.383
    (req, res) => {
        console.log(req.file);
        res.json({ url: `/img/${req.file.filename}` });
    });

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(),
async (req, res, next) => {
    try{
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);    // 정규표현식(이걸 잘하면 중급 기술자이다)
        if(hashtags) {
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate(
                {
                    where: { title: tag.slice(1).toLowerCase() },
                })));
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');  // 원래 위치로 돌아간다
    }catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag;
    if(!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.find({ where: { title : query } });
        let posts = [];
        if(hashtag) {
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            user: req.user,
            twits: posts,
        });
    } catch (error){
        console.error(error);
        return next(error);
    }
});

module.exports = router;