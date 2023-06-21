import React from 'react'
import "./TaskDisplay.css";
import { useDrag } from "react-dnd";
import { deleteTaskService } from '../../../Service/user.service';
import { toast } from 'react-toastify';

const TaskDisplay = ({ task, data, setData }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id }, // Include the id property in the item object
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const deleteTask = async(id) => {
      try {
        await deleteTaskService(id).then((res) => {
          toast.success("Task deleted successfully");
         setData((prevList) => prevList.filter((tasks) => tasks._id !== id));
      });
  } catch (err) {
    console.log(err);
  }
}

  return (
    <div ref={drag} className={`task1  ${isDragging ? "opacity-25" : "opacity-100"} mt-4 p-3 align-items-center`}>
       <span className="mx-1 float-end d-flex justify-content-center align-items-center " style={{ cursor: "pointer" }} title="delete task"
        onClick={() => deleteTask(task._id)}
      >
        <i className="fa fa-trash-o"></i>
      </span>
      <div>Title: {task.title}</div>
      <div className="pt-2">Task: {task.task}</div>
      <div className="d-flex justify-content-center align-items-center float-end mx-2">
        {task.inviteUserDetails && (
          <div className="name1 pt-1" title={task.inviteUserDetails.name}>
            {task.inviteUserDetails.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDisplay