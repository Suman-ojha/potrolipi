const router=require('express').Router();

const {CreateTodo,getAllTodos,getActiveTodos,SingleTodos,DeleteSingleTodo,updateTodo}=require('../controllers/Task')

//get all todos
router.get('/all',getAllTodos);
//get only active todos
router.get('/active',getActiveTodos);
//get perticular todo's
router.get('/:id',SingleTodos);
//delete particulr todos
router.delete('/:id',DeleteSingleTodo);
//post a todo
router.post('/',CreateTodo);
//Update the todo
router.put('/:id',updateTodo)

module.exports=router;