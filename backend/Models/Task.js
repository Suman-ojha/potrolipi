const mongoose = require("mongoose");
const User = require('./User');
const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
