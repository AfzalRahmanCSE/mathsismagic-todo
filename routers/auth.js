const express=require('express')
const router=express.Router()

router.route('/users')
.get((req,res,next)=>{
    res.status(200).json({message:'All users list soon'})
})

module.exports=router;