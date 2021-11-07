const express = require('express');
const router=express.Router();
const { getPosts,createPost,updatePost,deletePost } = require('../controllers/post')
const { authVerifyMiddelware } = require("../controllers/user")

router.get('/',authVerifyMiddelware,getPosts)
router.post('/createPost',authVerifyMiddelware,createPost)
router.post('/:id',authVerifyMiddelware,updatePost)
router.delete('/:id',authVerifyMiddelware,deletePost)

module.exports=router