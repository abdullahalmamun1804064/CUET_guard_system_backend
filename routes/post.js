const express = require('express');
const router = express.Router();

const { getSinglePost, getAllPost, create, update, deletePost } = require('../controllers/postController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.get('/', getAllPost);
router.post('/', create);
router.get('/:id', getSinglePost)
router.put('/:id',isAuthenticatedUser, update)
router.delete('/:id', deletePost);


module.exports = router;
