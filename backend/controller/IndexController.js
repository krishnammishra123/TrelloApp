const User= require('../model/UserModel');
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const nodemailer = require("nodemailer");
const dataupload = require("../model/UploadModel");
 

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
 

//registration user
const register=async(req,res)=>{
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
      return res.status(400).json({ massage: errors.array() });
  }
    try {
        const { name, email, password, mobile } = req.body;
      
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(409).json({ massage: "Email already exists" });
    } else {
      const user = new User({ name, email, password, mobile,info:Date(),role:"user"});
      //middleware for hashing password
      await user.save();
      return res.status(200).json({ massage: "User Register succesfully" });
    }
  } catch (err) {
     return res.status(500).json({ massage: "Something is wrong" });
  }
}


//Login User
const login = async (req, res) => {
  //Form Valdiation
  const { errors, isValid } = validateLoginInput(req.body);

   if (!isValid) {
     return res.status(400).json({ massage: errors.array() });
  } 
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      const matchPassword = await bcrypt.compare(password, existUser.password);
      if (!matchPassword) {
        return res.status(400).json({ massage:"invalid login credentials"});
      } else {
          const token = await existUser.generateAuthToken();
        return res.status(200).json({ massage: "User Login seccessfully",user:existUser,token});
      }
    } else {
      return res.status(404).json({ massage:"invalid login credentials"});
    }
  } catch (err) {
     return res.status(500).json({ massage: "Something is wrong" });
  }
}


//email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krishnammishra1426@gmail.com",
    pass: "kxbdfdrxafmarerc",
  },
});
//send Email Link for Reset password
const sendpasswordlink = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ massage: "Enter your EmailId" });
  }
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
       const token = jwt.sign({ _id: existUser._id },process.env.JWT_SECRET_KEY, {
         expiresIn: "120s",
       });
      
     const setusertoken=await User.findByIdAndUpdate({_id:existUser._id},{verifytoken:token},{new:true})
   
      if (setusertoken) {
        var mailOptions = {
          from: "krishnammishra1426@gmail.com",
          to: email,
          subject: "Sending Email For Password Reset",
          text: `This Link Valid For 2 Minutes http://localhost:3000/forgot_password/${existUser._id}/${setusertoken.verifytoken}`,
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            // console.log(error);
            res.status(400).json({ massage: "Email not found" });
          } else {
            console.log("Email sent: " + info.response);
             res.status(200).json({ massage: "Password reset link send Successfully in your Email" });
          }
        });
      }
    } else {
      return res.status(400).json({ massage: "Email not found"});
    }
  } catch (err) {
      return res.status(400).json({ massage: "Invalid User" });
  }
};

//verify user for forgot password time
const forgotpassword  = async ( req, res) => {
  const { id, token } = req.params;
  try {
    const existUser = await User.findOne({ _id:id, verifytoken:token })
    const VerifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if (existUser && VerifyToken._id) {
      res.status(200).json({ massage: existUser });
    } else {
       res.status(400).json({ massage:"User Not Exist" });
    }
  } catch (err) {
    res.status(400).json({ massage: err });
 }
};

//changePassword
const changePassword = async(req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  
  try {
    const existUser = await User.findOne({ _id:id, verifytoken:token });
    
    const VerifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if (existUser && VerifyToken._id) {
      const newpassword = await bcrypt.hash(password, 12)
      const setnewuserpassword=await User.findByIdAndUpdate({_id:id},{password:newpassword})
      setnewuserpassword.save();
      res.status(200).json({massage:"Password Succesfully Update"});
    } else {
      res.status(400).json({ massage: "! Token is expired generate new Link" });
    }
  }catch (err) {
     res.status(400).json({ massage: "user not found!!!!!" });
  }
}

const ImageData = async(req, res) => {
     const { name } = req.body;
     const file = req.file.originalname;
     try {
       const insertData = new dataupload({ name,file });
       await insertData.save();
       res.status(200).json({ massage: "Image Added Successfully" });
     } catch (err) {
       res.status(500).json({ massage: "Something is wrong" });
     }
}



 
exports.register=register;
exports.login=login;
exports.sendpasswordlink = sendpasswordlink;
exports.forgotpassword = forgotpassword;
exports.changePassword = changePassword;
exports.ImageData = ImageData;








 //The res.cookie() method is used for setting the cookie name to value. The value parameter can be a string or an object converted to JSON.
          // res.cookie("usercookie",token,{
          //   expires: new Date(Date.now() + 86400*1000),
          //   httpOnly: true,  
          // });
          
          
          
          // const logout = async (req, res) => {
          //   try {
          //     req.rootuser.tokens = req.rootuser.tokens.filter((curelem) => {
          //       return curelem.token !== req.token;
          //     });
          //     res.clearCookie("usercookie", {
          //       path: "/",
          //     });
          //     req.rootuser.save();
          //     res.status(200).json({ massage: "logout succesfully" });
          //   } catch (err) {
          //     res.status(400).json({ err });
          //   }
          // };  exports.logout = logout;