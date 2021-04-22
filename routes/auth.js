const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    console.log(req.user);
    res.render('login', {errorMessage: req.message});

});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login'}), (req, res) => {
    console.log('local login successful!')
    console.log(req.user);
    
    res.redirect('/');
})

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