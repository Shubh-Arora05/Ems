const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,

  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
  },
  newTask: {
    type: Boolean,
  },
  completed: {
    type: Boolean,
  },
  failed: {
    type: Boolean,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
