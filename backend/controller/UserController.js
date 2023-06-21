const User = require("../model/UserModel");
const Card = require("../model/AddtaskModel");
const Project = require("../model/AddProjectModel");
const Task = require("../model/taskModel");
const { async } = require("rxjs");

//verify user for  user
const validuser = async(req,res) => {
  try {
   return res.status(200).json({ ValidUserOne: req.rootuser });
  }catch(err){
  return res.status(500).json({ massage: "Something is Wrong"});
  }
};


const editprofile = async (req, res) => {
  const { name, mobile } = req.body;
  try {
    const EditUserOne = await User.findByIdAndUpdate(req.userId ,{name, mobile},{new:true}) 
    if (!EditUserOne) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ massage:"Profile Update Succesfully"});
  } catch (err) {
    res.status(500).json({ message: "Something is Wrong" });
  }
};

//find user
const findUser = async (req,res) => {
  try {
    const users = await User.find({}, "_id name email");
     if (!users) {
       return res.status(404).json({ message: "User not found" });
     }
    res.status(200).json({ users: users });
  } catch (err) {
     res.status(500).json({ message: "Something is Wrong" });
  }
}

//find user by Id
const find = async (req,res) => {
  try {
    const data = await User.findById(req.params.userId);
     if (!data) {
       return res.status(404).json({ message: "User not found" });
     }
    res.status(200).json({ userdata: data });
  } catch (err) {
     res.status(500).json({ message: "Something is Wrong" });
  }
}


 const addProject = async (req, res) => {
   const { project, userID, invitedUsers } = req.body;
   // Remove the current user's ID from the invitedUsers array
  const filteredInvitedUsers = invitedUsers.filter((user) => user !== userID);
   try {
     const newProject = new Project({projectName:project ,userID: userID ,invitedUsers: [...filteredInvitedUsers,userID], info: Date() });
     const data = await newProject.save();
     return res.status(200).json({ massage: "Add Project succesfully", details: data });
   } catch (err) {
     return res.status(500).json({ massage: "Something is Wrong" });
   }
 };

const getProjectData = async (req, res) => {
  try {
    const projects = await Project.aggregate([
      {
        $lookup: {
          from: "users", // Replace "users" with the actual collection name of the User model
          localField: "userID",
          foreignField: "_id",
          as: "userDetail",
        },
      },
    ]);
    // Retrieve only the necessary user fields (name and email)
    const userIds = projects.map((project) => project.userID);
    const users = await User.find(
      { _id: { $in: userIds } },
      { name: 1, email: 1 }
    );
    // Map the user details to the corresponding card
    projects.forEach((project) => {
      const user = users.find(
        (user) => user._id.toString() === project.userID.toString()
      );
       project.userDetail = user;
    });
return res.status(200).json({ massage: "get Project succesfully", details: projects });
  } catch (err) {
    return res.status(500).json({ massage: "Something is Wrong" });
  };
};


const getTaskData = async (req,res) => {
  try {
    const projects = await Project.findById(req.params.id);
     if (!projects) {
       return res.status(404).json({ message: "User not found" });
     }
    return res.status(200).json({ massage: "get Project succesfully", details: projects });
  } catch (err) {
     return res.status(500).json({ massage: "Something is Wrong" });
  }
  
}


const createTask = async (req, res) => {
  const { title, task, invite, userID, projectID } = req.body;
  
  try {
    const newTask = new Task({ title, task, inviteUser:invite, userID:userID,projectID:projectID, info: Date() });
    const data = await newTask.save();
    return res.status(200).json({ massage: "Add Task succesfully", details: data });
  } catch (err) {
    return res.status(500).json({ massage: "Something is Wrong" });
  }
};



//get data taskList
const getTaskListData = async (req, res) => {
  try {
    const projectId = req.params.id;

    const tasks = await Task.aggregate([
      {
        $match: {
          projectID: projectId, // Filter tasks by project ID
        },
      },
      {
        $lookup: {
          from: "users", // Replace "users" with the actual collection name of the User model
          localField: "inviteUser",
          foreignField: "_id",
          as: "inviteUserDetails",
        },
      },
      {
        $lookup: {
          from: "users", // Replace "users" with the actual collection name of the User model
          localField: "userID",
          foreignField: "_id",
          as: "userDetails",
        },
      },
    ]);

    // Extract user IDs and invite user IDs from the tasks
    const userIds = tasks.map((task) => task.userID);
    const inviteUserIds = tasks.map((task) => task.inviteUser);

    // Retrieve user details based on user IDs
    const users = await User.find(
      { _id: { $in: userIds.concat(inviteUserIds) } },
      { name: 1, email: 1 }
    );

    // Map the user details to the corresponding task
    tasks.forEach((task) => {
      const user = users.find(
        (user) => user._id.toString() === task.userID.toString()
      );
      task.userDetails = user;

      const inviteUser = users.find(
        (user) => user._id.toString() === task.inviteUser.toString()
      );
      if (inviteUser) {
        task.inviteUserDetails = {
          _id: inviteUser._id,
          name: inviteUser.name,
          email: inviteUser.email,
        };
      }
    });

    return res.status(200).json({ details: tasks });
  } catch (err) {
    return res.status(500).json({ message: "Something is wrong" });
  }
};

 
const updatetaskstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const update = await Task.findByIdAndUpdate(req.params.id,{ status },{ new: true });
    if (!update) {
      return res.status(404).json({ massage: "User not found" });
    }
    return res.status(200).json({ massage: "update successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the task status" });
  }
};


//detele Project
const deteleProject = async(req,res) => {
  const {id} = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ massage: "Project not found" });
    }
    
    await Task.deleteMany({ projectID: id });

    return res.status(200).json({ massage: "Project and associated tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the task status" });
  }
}

//detele Project
const deteleTask = async(req,res) => {
  const {id} = req.params;
  try {
    const  task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ massage: "Project not found" });
    }
    return res.status(200).json({ massage: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the task status" });
  }
}

const searchProject = async (req, res) => {
  const search = req.query.search || "";
  try {
    const query = { $regex: search, $options: 'i' };
 
    const result = await Project.find({ projectName: query });
    return res.status(200).json({ massage: "Search successful",details: result });
  } catch (err) {
    res.status(500).json({ error: "Failed to search projects" });
  }
};



const addTask = async (req, res) => {
  const { title, task, id } = req.body;
  try {
    const newCard = new Card({ title, task , userId:id, info: Date()  });
    const data = await newCard.save();
    return res.status(200).json({ massage: "Add Task succesfully",details:data});
  } catch (err) {
    return res.status(500).json({ massage: "Something is Wrong" });
  }
};


const getdata = async (req, res) => {
  try {
       const cards = await Card.aggregate([
         {
           $lookup: {
             from: "users", // Replace "users" with the actual collection name of the User model
             localField: "userId",
             foreignField: "_id",
             as: "userDetails",
           },
         },
       ]);

       // Retrieve only the necessary user fields (name and email)
       const userIds = cards.map((card) => card.userId);
       const users = await User.find(
         { _id: { $in: userIds } },
         { name: 1, email: 1 }
       );

       // Map the user details to the corresponding card
       cards.forEach((card) => {
         const user = users.find(
           (user) => user._id.toString() === card.userId.toString()
         );
         card.userDetails = user;
       });
    return res.status(200).json({ details: cards });
  } catch (err) {
    return res.status(500).json({ massage: "Something is Wrong" });
  }
};


const updateStatus = async (req, res) => {
   try {
    const { status } = req.body;
  const update =  await Card.findByIdAndUpdate(req.params.id, { status }, { new: true });
     if (!update) {
       return res.status(404).json({ message: "User not found" });
     }
      return res.status(200).json({massage: "update successfully"});
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the task status' });
  }
};



exports.validuser = validuser;
exports.editprofile = editprofile;
exports.addTask = addTask;
exports.getdata = getdata;
exports.updateStatus = updateStatus;
exports.addProject = addProject;
exports.getProjectData = getProjectData;
exports.findUser = findUser;
exports.getTaskData = getTaskData;
exports.find = find;
exports.createTask = createTask;
exports.getTaskListData = getTaskListData;
exports.updatetaskstatus = updatetaskstatus;
exports.deteleProject = deteleProject;
exports.deteleTask = deteleTask;
exports.searchProject = searchProject;