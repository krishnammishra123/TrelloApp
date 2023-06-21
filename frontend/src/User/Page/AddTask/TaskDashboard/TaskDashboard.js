import React, { useState } from 'react'
import './TaskDashboard.css';
import TaskForm from '../TaskForm/TaskForm';
import TaskDetails from '../TaskDetails/TaskDetails';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskDashboard = ({ id }) => {
  const [data, setData] = useState([]);
 
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container2">
        <div className="gap-50 d-flex flex-column bg-slate-500 ">
          <TaskForm id={id} setData={setData} />
          <TaskDetails data={data} setData={setData} />
        </div>
      </div>
    </DndProvider>
  );
}

export default TaskDashboard