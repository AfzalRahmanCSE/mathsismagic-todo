const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Mandatory']
    },
    email:{
        type:String,
        required:[true,'Email is mandatory'],
        uniques:true
    },
    password:{
        type:String,
        required:[true,'Password is mandatory'],
        select:false
    }
},
{timestamps:true}

)

const userModel=mongoose.model('Muser',userSchema)

module.exports=userModel