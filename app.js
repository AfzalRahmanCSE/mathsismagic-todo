const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()

const connectDatabase=require('./config/database')

connectDatabase()

app.use(express.json())
app.use(cors())



module.exports=app;