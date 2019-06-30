const express = require('express');
const multer = require('multer');

const { User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;
