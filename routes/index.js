var express = require('express');
var router = express.Router();

/* GET home page. */
/*  <%= title %> will render   */ 
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Some Express App', user: req.user});
});

module.exports = router;
