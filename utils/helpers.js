const jwt=require('jsonwebtoken')

exports.getJwtToken=(user)=>{
const {_id,email}=user;
    return jwt.sign({_id,email},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}