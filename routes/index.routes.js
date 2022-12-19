var express = require('express');
var router = express.Router();

const { indexController } = require('../controllers/index.controllers');

/* GET home page */
router.get('/', indexController);

module.exports = router;