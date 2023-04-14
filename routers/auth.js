const express=require('express');
const { getAllUsers,registerUser } = require('../controllers/authController');
const router=express.Router()

router.route('/')
.get(getAllUsers)

router.route('/signup')
.post(registerUser)
module.exports=router;