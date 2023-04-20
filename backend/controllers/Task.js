const Todo = require("../Models/Task");
const User=require('../Models/User')


const CreateTodo = async (req, res) => {
  const todo = new Todo({ ...req.body, user: req.id });
  try {
    // const todo = new Todo({
    //   title,
    //   description,
    //   status,
    // });
    const todos = await todo.save();
    return res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:"There was a serverside  error.."});
  }
};
const getAllTodos = async (req, res) => {
  console.log('in the getAllTodos');
  console.log('req.id in getAllTodos:', req.user.userId);
  // const id=req.id
  try {
    const todos = await Todo.find({ user: req.user.userId }).select("title description status");
    return res.status(201).json({ todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:"There was a serverside  error.."});
  }
  
};
const getActiveTodos = async (req, res) => {
  try {
    const activeTodo = await Todo.find({ status: "active" }).select(
      "title description status"
    );
    return res.status(201).json({ activeTodo });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
const SingleTodos = async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(201).json({ todo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const DeleteSingleTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json(todo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
const updateTodo = async (req, res) => {
 
  const updates = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    console.log(todo);
    return res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  CreateTodo,
  getAllTodos,
  getActiveTodos,
  SingleTodos,
  DeleteSingleTodo,
  updateTodo,
};
