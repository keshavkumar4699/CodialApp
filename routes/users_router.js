const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/login/', userController.login);
router.get('/signup', userController.signup);
router.get('/profile', userController.profile);
router.post('/create', userController.create);

router.post('/create-session', userController.creatSession);

module.exports = router;