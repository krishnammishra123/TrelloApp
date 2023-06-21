const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "projectName is required"],
    trim: true,
  },
  userID: {
    type: String,
    ref: "User", // Replace 'User' with the actual model name for the user collection
    required: [true, "UserId is required"],
  },
  invitedUsers: [
    {
      type: String,
      default: [],
    },
  ],
  info: String,
});

module.exports = mongoose.model("Project", projectSchema);
