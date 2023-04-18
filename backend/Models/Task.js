const mongoose = require("mongoose");

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
  //   user: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true,
  //   },
});
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
