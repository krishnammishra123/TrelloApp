import React from "react";
import "./Task.css";
import { useDrag } from "react-dnd";

const Task = ({ task, cardList, setCardList }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id }, // Include the id property in the item object
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`task1 mt-4 p-3 ${
        isDragging ? "opacity-25" : "opacity-100"
      } align-items-center`}
    >
      <div>Title: {task.title}</div>
      <div className="pt-2">Task: {task.task}</div>
      <div className="d-flex justify-content-center align-items-center float-end mx-3">
        {task.userDetails && task.userDetails.name && (
          <div className="name1 pt-1" title={task.userDetails.name}>
            {task.userDetails.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
