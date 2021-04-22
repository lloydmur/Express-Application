var express = require('express');
var router = express.Router();
const userModel = require('../public/models/user');

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/login');
  }
  else{
    next();
  }
}

/* GET users listing. */
router.get('/all', function(req, res, next) {
  if(!req.user.isAdmin){
    res.redirect('/', {user: req.user});
  }
  else {
    userModel.find()
    .then((result) => {
      res.render('users', {user: req.user, title: 'All users',users: result});
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })
  }
  
});

router.get('/profile', authCheck, (req, res, next) => {
  res.render('user', {AP: req.user.isAdmin, user: req.user});
});

router.get('/:userId', (req, res, next) => {
  console.log(req.params.userId);
  
  userModel.findOne({_id: req.params.userId})
    .then((user) => {
      console.log(user)
      
      res.render('user', {AP: req.user.isAdmin ,user: user, title: user.userName + '\'s profile'})
    })
    .catch((err) => console.log(err));
});

router.get('/', (req, res,) => {
  userModel.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
});
//SIGNUP
router.post('/', function(req, res, next){
  const newUser = new userModel({
    userName: req.body.username,
    password: req.body.password,
    dateOfBirth: req.body.dob 
  });
  newUser.save()
    .then((result) => {
      console.log(result);
      res.redirect(`/users/${result.body.id}`)
    })
    .catch(err => console.log(err))
});

router.delete('/', function(req, res, next){
  res.send('Get a DELETE request at /user');
});

module.exports = router;
