const User=require('./../models/users')
const {errorResponse}=require('./../utils/errorResponse')
const bcrypt=require('bcrypt')
const {getJwtToken}=require('./../utils/helpers')
const catchAsync=require('./../utils/catchAsync')



exports.getAllUsers=async (req,res,next)=>{
  const allUsers=await User.find()
    res.status(200).json(allUsers)
}

exports.registerUser=async (req,res,next)=>{
    const {name,email,password}=req.body
    if(!name||!email||!password){
     // return res.status(400).json({error:'error'})
    return  next(errorResponse('All Fields Mandatory',400))
    }
    //console.log("req >>",req.body)
     const userExists=await User.findOne({email:email})
    console.log(userExists)
     if(userExists){
         return next(errorResponse('User Already Exist',400))
     }
    const hashedPassword=await bcrypt.hash(password,1)

    req.body.password=hashedPassword
    
   const user= await User.create(req.body)
//console.log(user)
const token=await getJwtToken(user)

  return  res.status(201).json(token)
}

exports.loginUser=async (req,res,next)=>{
  const {email,password}=req.body
  if(!email||!password){
    return next(errorResponse('All fields Mandatory',400))
  }
  const user=await User.findOne({email:email}).select('password')
  if(!user){
    return next(errorResponse('User doesnt exist',400))
  }

  const isPasswordCorrect=await bcrypt.compare(password,user.password)

  if(!isPasswordCorrect){
    return next(errorResponse('Invalid Email or password',400))
  }

  const token=await getJwtToken(user)
  return res.status(200).json({token})
}