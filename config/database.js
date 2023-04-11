const mongoose=require('mongoose')


const connectDatabase=()=>{

    mongoose.connect(process.env.MONGO_DB_STR)
    .then(()=>console.log('Connected to DB'))
    .catch((err)=>console.error(err))
}
module.exports=connectDatabase
