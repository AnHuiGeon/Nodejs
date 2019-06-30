const express = require('express');
const { isLoggedIn } = require('./middlewares');
const {Semester_content, Semester_purpose, Semester_summary } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    Semester_summary.findAll()
    .then((summarys)=> {
      Semester_purpose.findAll({})
      .then((purposes) => {
        Semester_content.findAll({})
        .then((contents) => {
          // 첫 화면 띄우면서 DB내용 다 긁어옴.
          res.render('semesterInfo', {
            title: '현지학기 프로그램 소개 페이지', // 필요 없음
            user: req.user, summarys, purposes, contents });
            // semsterInfo.pug로 {안의} 내용들을 보냄으로써 if(?)가 열림
        })
      })
    })
  });
  
  router.post('/', (req, res) => {
    const {post_table_name, info} = req.body;
    // post_table_name : input태그의 name=''값, info : input태그의 value값
    if(post_table_name == 'summary'){
      Semester_summary.create({summary : info})
      .then((result) => {
        // result : Executing (default): INSERT INTO `semester_summaries` (`id`,`summary`) VALUES (DEFAULT,'sss');
        res.json({result});
        // 요청에 대한 응답이므로 res.json({result})으로 다시 넘어감
      })
    }
    else if(post_table_name == 'purpose'){
      Semester_purpose.create({purpose : info})
      .then((result) => {
        res.json({result});
      })
    }else if(post_table_name == 'content'){
      Semester_content.create({content : info})
      .then((result) => {
        res.json({result});
      })
    }
  })
  
  router.patch('/', (req, res) => {
    const { id, patch_table_name, info} = req.body;
    if(patch_table_name == 'summary'){
      Semester_summary.update({summary: info}, {where: {id: id}})
    }else if(patch_table_name == 'purpose'){
      Semester_purpose.update({purpose: info}, {where: {id: id}})
    }else if(patch_table_name == 'content'){
      Semester_content.update({content: info}, {where: {id: id}})
    }
    res.json();
  })
  
  router.delete('/', (req, res) => {
    const { id, delete_table_name} = req.body;
    if(delete_table_name == 'summary'){
      Semester_summary.destroy({where: {id: id}})
    }else if(delete_table_name == 'purpose'){
      Semester_purpose.destroy({where: {id: id}})
    }else if(delete_table_name == 'content'){
      Semester_content.destroy({where: {id: id}})
    }
    res.json();
  })

module.exports = router;