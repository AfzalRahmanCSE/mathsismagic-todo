const express=require('express')
const router=express.Router()
const {getAllTodos,createTodo}=require('./../controllers/todoController')
const {isUserAuthenticated}=require('../middlewares/auth')

router.route('/')
.get(getAllTodos)

router.route('/new')
.post(isUserAuthenticated,createTodo)


module.exports=router;