const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  task: {
    type: String,
    required: [true, "task is required"],
    trim: true,
  },
  inviteUser: {
    type: String,
    required: [true, "InviteUser is required"],
  },
  userID: {
    type: String,
    required: [true, "UserId is required"],
  },
  projectID: {
    type: String,
    required: [true, "ProjectId is required"],
  },
  status: {
    type: String,
    enum: ["start", "progress", "closed"],
    default: "start",
  },
  info: String,
});

module.exports = mongoose.model("Task", TaskSchema);
