const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    lowercase: true,
    trim: true,
  },
  task: {
    type: String,
    required: [true, "task is required"],
    trim: true,
  },
  userId: {
    type: String,
    required: [true, "UserId is required"],
  },
  status: {
    type: String,
    enum: ["start", "progress", "closed"],
    default: "start",
  },
  info: String,
  //   role: String,
});

module.exports = mongoose.model("Card", UserSchema);
