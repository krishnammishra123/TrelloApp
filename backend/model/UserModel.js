const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    // match: [
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //   "Please fill a valid email address",
    // ],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },

  mobile: {
    type: Number,
    required: [true, "Mobile number is required"],
    trim: true,
  },
  verifytoken: {
    type: String,
  },
  info: String,
  role:String,
});

UserSchema.pre('save',async function(next){
    if(this.isModified("password")){
this.password=await bcrypt.hash(this.password,10);
    }
next();
})


//we are generating a token
UserSchema.methods.generateAuthToken=async function(){
    try{
      let token = jwt.sign({ _id: this._id,role:this.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        return token;
    }catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model("User", UserSchema);







 