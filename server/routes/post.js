const express = require('express');
const router=express.Router();
const { getPosts,createPost,updatePost,deletePost } = require('../controllers/post')

router.get('/',getPosts)
router.post('/createPost',createPost)
router.post('/:id',updatePost)
router.delete('/:id',deletePost)

module.exports=router