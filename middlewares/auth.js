
const jwt=require('jsonwebtoken')
const User=require('./../models/users')
const { errorResponse } = require('../utils/errorResponse')
const catchAsync=require('./../utils/catchAsync')

exports.isUserAuthenticated=catchAsync(async (req,res,next)=>{
    if(!req?.headers?.authorization?.startsWith('Bearer')){
      return  next(errorResponse('Unauthorized Access',401))
        }//Authorization is with small a

    const token=req.headers.authorization.split(' ')[1]

    
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)


    const user=await User.findById(decoded._id)
    req.body.user=user._id;
    return next()
 
})