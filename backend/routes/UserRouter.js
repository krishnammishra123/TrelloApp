const express = require("express");
const { validuser, editprofile, addTask,getdata,findUser ,updateStatus, addProject,getProjectData, getTaskData, createTask, getTaskListData,updatetaskstatus,deteleProject,deteleTask, searchProject} = require("../controller/UserController");
const verifyUser = require("../middleware/authenticate");
const { find } = require("../model/UserModel");

const router = express.Router();
//token varification
router.get("/validuser", verifyUser, validuser);

//get edituser as well as verify
router.put("/editprofile", verifyUser, editprofile);

//Add project
router.post("/addproject", verifyUser, addProject);

//Add task
router.post("/createtask", verifyUser, createTask);

//get task list data gettasklistdata
router.get("/gettasklistdata/:id", verifyUser, getTaskListData);

//find list
router.get("/finduser", verifyUser, findUser);

//find list
router.get("/find/:id", verifyUser,find);

//get Project list
router.get("/getprojectdata", verifyUser, getProjectData);

//get project data by id
router.get("/gettaskdata/:id", verifyUser, getTaskData);

//update taskby drag & drop updatetaskstatus
router.put("/updatetaskstatus/:id", verifyUser, updatetaskstatus);

//delete project deleteproject
router.delete("/deleteproject/:id", verifyUser, deteleProject);

//delete project deletetask
router.delete("/deletetask/:id", verifyUser, deteleTask);
 
//search Project
router.get("/searchproject", verifyUser, searchProject);

//Add task
router.post("/addTask", verifyUser, addTask);

//get gettasklist
router.get("/getdata", verifyUser, getdata);

//put  update status
router.put("/updatestatus/:id", verifyUser, updateStatus);
 
module.exports = router;
