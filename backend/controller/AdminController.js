
const User = require("../model/UserModel");

//verify user for  admin
const validuser = async (req, res) => {
  try {
    return res.status(200).json({ ValidUserOne:req.rootuser });
  } catch (err) {
    return res.status(500).json({ massage: "Something is Wrong" });
  }
};

const manageuser = async (req, res) => {
    try {
      const allUser = await User.find();
      if (allUser) {
        res.status(200).json({ massage: allUser });
      } else {
        res.status(404).json({ massage: "User Not Found" });
      }
    } catch (err) {
      res.status(500).json({ massage: "Something is Wrong" });
    }
};

const deleteUser = async (req, res) => {
  try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ massage: "User Deleted Successfully"});
  } catch (err) {
    res.status(500).json({ massage: "Something is Wrong" });
  }
};

const editAdmin = async (req, res) => {
  try {
    const data = await User.findById({_id:req.params.id});
    res.status(200).json({ massage: data });
  } catch (err) {
    res.status(500).json({ massage: "Something is Wrong" });
  }
};



const findUser = async (req, res) => {
  const search = req.query.search || "";
  const sort = req.query.sort || "";
  const page = req.query.page || 1; 
  const ITEM_PER_PAGE = 4;
     const query = {
       name: { $regex:search, $options: "i" },
     };
  try {
    const skip = (page - 1) * ITEM_PER_PAGE; // 1 * 4 = 4
    const count = await User.countDocuments(query);
    const allUser = await User.find(query).limit(ITEM_PER_PAGE).skip(skip); //.sort({ info:sort == "new" ? -1 : 1 })
    const pageCount = Math.ceil(count / ITEM_PER_PAGE); // 8 /4 = 2
    if (allUser) {
      res.status(200).json({
        Pagination: {
          count,
          pageCount,
        },
        massage: allUser,
      });
    } else {
      res.status(404).json({ massage: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ massage: "Something is Wrong" });
  }
};


const updateAdmin = async (req, res) => {
  const { name, mobile } = req.body;
  const { id } = req.params;
  
  try {
  const EditUserOne = await User.findByIdAndUpdate({_id:id},{ name, mobile }, { new: true });
    if (!EditUserOne) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ massage: "Profile Update Succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Something is Wrong" });
  }
};

exports.validuser = validuser
exports.manageuser = manageuser;
exports.deleteUser = deleteUser;
exports.editAdmin = editAdmin;
exports.findUser = findUser;
exports.updateAdmin = updateAdmin;