var express = require('express');
const app = require('../app');
var router = express.Router();
const User = require('../public/models/user');

router.get('/', (req, res, next) => {

    res.render('signup', {title: 'Sign up for some Express App'});
});

module.exports = router;