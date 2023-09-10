const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts_v1'));
router.use('/users', require('./users_v1'));

module.exports = router;