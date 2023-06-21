import React, { useEffect, useState } from "react";
import "./TaskForm.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { taskValidate } from "../../../Validation/Validation";
import {getTaskListService,getTaskService,getUserService,taskService} from "../../../Service/user.service";

const TaskForm = ({ id, setData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState();
  const [task, setTask] = useState();
  const [error, setError] = useState({});
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(null);
  const [assign, setAssign] = useState(null);
  const [invite, setInvite] = useState("");
  const userID = localStorage.getItem("id");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTaskService(id).then((res) => {
          setProject(res.details);
          setAssign(res.details.invitedUsers);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        await getUserService().then((res) => {
          setUsers(res.users);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, [setUsers]);

  useEffect(() => {
    const getData = async () => {
      await getTaskListService(id).then((res) => {
        setData(res.details);
      });
    };
    getData();
  }, [setData,id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validate = await taskValidate(title, task, invite);
      setError(validate);
      if (Object.keys(validate).length === 0) {
        const data = { title, task, invite, userID, projectID: id };
        await taskService(data)
          .then((res) => {
            setData((pre) => [...pre, res.details]);
            console.log(res.details);
            toast.success(res.massage, { position: toast.POSITION.TOP_RIGHT });
            setTitle(" ");
            setTask(" ");
            handleClose();
            console.log("added successfully");
          })
          .catch((err) => {
            console.log("err");
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex align-items-center mt-4 mx-3 ">
      <div>
        <button onClick={handleOpen}>Add Task</button>
      </div>
      <div className="d-flex text-items-center align-items-center justify-content-center mt-3 mx-5 ">
        <p className="projectNAme">Project Name :-{project && project.projectName}</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="style">
          <form onSubmit={handleSubmit}>
            <div className="title">
              <label>Title :</label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {error && <span>{error.title}</span>}
            <div className="task">
              <label>Task :</label>
              <input
                type="text"
                placeholder="Enter tisk"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            {error && <span>{error.task}</span>}
            <div className="user">
              <label className="users"> Select Users: </label>
              <select
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
              >
                <option>Assign User</option>
                {assign?.map((userId) => {
                  if (userId !== userID) {
                    const user = users.find((user) => user._id === userId);
                    return (
                      <option key={userId} value={userId}>
                        {user?.name}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>
            {error && <span>{error.invite}</span>}
            <div className="submit">
              <input type="submit" placeholder="submit" />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TaskForm;
