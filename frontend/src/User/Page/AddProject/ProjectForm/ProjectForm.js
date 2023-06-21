import React, { useEffect, useState } from "react";
import "./ProjectForm.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { projectValidate } from "../../../Validation/Validation";
import { toast } from "react-toastify";
import {getProjectService,getUserService,projectService } from "../../../Service/user.service";

const ProjectForm = ({ setProjectList, search, setSearch }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [project, setProject] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState({});
  const userID = localStorage.getItem("id");
  const [users, setUsers] = useState([]);
 

  useEffect(() => {
    const getUser = async () => {
      await getUserService().then((res) => {
        setUsers(res.users);
      });
    };
    getUser();
  }, [setUsers]);

  useEffect(() => {
    const getData = async () => {
      await getProjectService().then((res) => {
        setProjectList(res.details);
      });
    };
    getData();
  }, [setProjectList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validate = await projectValidate(project, selectedUsers);
      setError(validate);
      if (Object.keys(validate).length === 0) {
        const data = {
          project,
          userID,
          invitedUsers: [...selectedUsers, userID],
        };
        await projectService(data)
          .then((res) => {
            setProjectList((pre) => [...pre, res.details]);
            toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
            setProject("");
            setSelectedUsers([]);
            handleClose();
            console.log("Added project successfully");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="d-flex justify-content-between align-items-center mt-5 mx-3 mb-5 ">
      <div>
        <button onClick={handleOpen}>Add Project</button>
      </div>
      <div className="search mx-3 d-flex float-direction-right">
        <input
          type="search"
          placeholder="Search here...😊"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="inputSearch"
        />
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
              <label>Add Project:</label>
              <input
                type="text"
                placeholder="Enter title"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
            </div>
            {error && <span>{error.project}</span>}
            <div className="user">
              <label className="users"> Select Users: </label>
              <select
                value={selectedUsers}
                onChange={(e) =>
                  setSelectedUsers(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                multiple
              >
                {users.map((user) => {
                  // Exclude the current user (yourself) from the selectable options
                  if (user._id !== userID) {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>
            {error && <span>{error.selectedUsers}</span>}
            <div className="submit">
              <input type="submit" placeholder="submit" />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectForm;
