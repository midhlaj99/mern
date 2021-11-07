const express = require('express');
const router=express.Router();
const { userSignIn,userSignUp,authVerify } = require('../controllers/user')

router.post('/signin',userSignIn)
router.post('/signup',userSignUp)

module.exports=router