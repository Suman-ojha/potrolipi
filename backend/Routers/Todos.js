const router=require('express').Router();

const {CreateTodo,getAllTodos,getActiveTodos,SingleTodos,DeleteSingleTodo,updateTodo}=require('../controllers/Task')

const {verifyToken}=require('../utils/verifyToken')
//get all todos
router.get('/all',verifyToken,getAllTodos);
//get only active todos
router.get('/active',verifyToken , getActiveTodos);
//get perticular todo's
router.get('/:id',verifyToken , SingleTodos);
//delete particulr todos
router.delete('/:id' ,verifyToken, DeleteSingleTodo);
//post a todo
router.post('/',verifyToken , CreateTodo);
//Update the todo
router.put('/:id',verifyToken , updateTodo)

module.exports=router;