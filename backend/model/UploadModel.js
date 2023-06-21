const mongoose = require("mongoose");
 
const UserSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("dataupload", UserSchema);

 
