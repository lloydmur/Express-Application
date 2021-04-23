const router = require('express').Router();
const passport = require('passport');
const User = require('../public/models/user');
const bcrypt = require('bcrypt');


//SIGNUP
router.post('/signup', function(req, res, next){
    
    const newUser = new User({
      userName: req.body.username,
      password: req.body.password,
      dateOfBirth: req.body.dob 
    });
    bcrypt.hash(newUser.password, 10)
        .then((hash) => {
            console.log('Password hashed: ' + hash)
            newUser.password = hash;
            newUser.save();
            res.redirect(`/`);
        })
        .catch((err) => console.log(err));
    
  });

router.get('/signup', (req, res, next) => {
    res.render('signup', {title: 'Creat an Accaount!'});
});

//LOGIN
router.get('/login', (req, res) => {
    console.log(req.user);
    res.render('login', {errorMessage: req.message});

});

router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login'}), (req, res) => {
    console.log('local login successful!')
    console.log(req.user);
    
    res.redirect('/');
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('logout', (req, res) => {
 
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//Simple google plus login api 
router.get('/googlee', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

module.exports = router;