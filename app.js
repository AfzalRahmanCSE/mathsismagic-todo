const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const auth=require('./routers/auth')

const connectDatabase=require('./config/database')

connectDatabase()

app.use(express.json())
app.use(cors())

app.get('/api/v1/health',(req,res)=>{
    res.send({status:'Up'})
})
app.use('/api/v1',auth)



module.exports=app;