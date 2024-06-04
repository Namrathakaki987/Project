const express = require('express');
const router = express.Router();
const verify = require('../middlewares/VerifyToken');
const postController = require('../controllers/postController');

// Get paginated posts
router.get('/', verify, postController.getPosts);

module.exports = router;


