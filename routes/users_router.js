const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/login/', userController.login);
router.get('/signup', userController.signup);
router.get('/profile', userController.profile);
router.post('/create', userController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect:'/user/profile'},
),userController.creatSession);

module.exports = router;