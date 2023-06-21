const express = require("express");
const { validuser, manageuser, deleteUser, editAdmin, findUser, updateAdmin } = require("../controller/AdminController");
const verifyAdmin = require("../middleware/authenticate");
 

 


const router = express.Router();
//token varification
router.get("/validuser",verifyAdmin,validuser);

router.get("/manageuser", verifyAdmin, manageuser);

router.delete("/delete/:id", verifyAdmin, deleteUser);
 
router.get("/editadmin/:id", verifyAdmin, editAdmin);
//update admin
router.post("/updateuser/:id", verifyAdmin, updateAdmin);

router.get("/finduser",verifyAdmin, findUser);

module.exports = router;


 