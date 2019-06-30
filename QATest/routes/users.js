var express = require('express');
var User = require('../models').User;

var router = express.Router();

router.post('/', async (req, res, next) => {
  const { name, age } = req.body;
  try{
    if(!(name && age)){
      return res.redirect('/');
    }
    await User.create({
      name,
      age,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
