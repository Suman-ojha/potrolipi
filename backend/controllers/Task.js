const Todo = require("../Models/Task");

const CreateTodo = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const todo = new Todo({
      title,
      description,
      status,
    });
    const todos = await todo.save();
    return res.status(200).json({ todos });
  } catch (error) {
    return res.status(404).json(error);
  }
};
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).select("title description status");
    return res.status(201).json({ todos });
  } catch (error) {
    return res.status(404).json(error);
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
  const id = req.params.id;
  const updates = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
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
