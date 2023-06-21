import React, { useEffect, useState } from 'react';
import './CreateTask.css';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { cardValidate } from '../../Validation/Validation';
import { cardService, getListService } from '../../Service/user.service';

const CreateTask = ({ setCardList }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState();
  const [task, setTask] = useState();
  const [error, setError] = useState({});
  const id = localStorage.getItem("id");

     useEffect(() => {
       const getData = async () => {
         await getListService().then((res) => {
           console.log(res.details);
           setCardList(res.details);
         });
       };
       getData();
     }, [setCardList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validate = await cardValidate(title, task);
      setError(validate);
      if (Object.keys(validate).length === 0) {
        const data = { title, task , id };
        await cardService(data).then((res) => {
            setCardList((pre) => [...pre,res.details]);
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
            <div className="submit">
              <input type="submit" placeholder="submit" />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTask