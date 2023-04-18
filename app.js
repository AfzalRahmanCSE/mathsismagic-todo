const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const auth=require('./routers/auth')
const todo=require('./routers/todo')

const connectDatabase=require('./config/database')

connectDatabase()

app.use(express.json())
app.use(cors())

app.get('/api/v1/health',(req,res)=>{
    res.send({status:'Up'})
})
app.use('/api/v1/users',auth)
app.use('/api/v1/todo',todo)

app.use('*',(req,res)=>{
    res.status(404).json({error:'Page Not Found'})
})

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		status: err.status || 'error',
		message: err.message,
	});
});




module.exports=app;