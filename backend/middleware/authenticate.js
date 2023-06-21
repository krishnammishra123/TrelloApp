const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

const authenticate = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ massage: "Unauthprized no token provide!" });
        }
      const VerifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
          const rootuser = await User.findOne({ _id: VerifyToken._id });
    
        if (!rootuser) {
            throw new Error("user not found !!!");
          }
          req.rootuser =rootuser;
          req.userId = rootuser._id;
          req.role = rootuser.role;
       next();
    } catch(err) {
        res.status(500).json({ massage: "Unauthprized no token provide" });
    }
}

 const verifyAdmin = (req, res, next) => {
   authenticate(req, res,  () => {
     if (req.role === "admin") {
       next();
     } else {
        res.status(500).json({ massage: "User not found" });
     }
   });
 };

const verifyUser = (req, res, next) => {
  authenticate(req, res, next, () => {
        if (req.role === "user") {
          next();
        } else {
          res.status(500).json({ massage: "User not found!!!" });
        }
      });
    };


module.exports = authenticate;
module.exports = verifyAdmin;
module.exports = verifyUser;
 