import React, { useEffect, useState } from 'react'
import "./TaskDetails.css";
import Segment from '../Segment/Segment';

const TaskDetails = ({ data, setData }) => {
   const [todos, setTodos] = useState([]);
   const [inProgress, setInProgress] = useState([]);
   const [closed, setClosed] = useState([]);
   const userId = localStorage.getItem("id");    
     
        useEffect(() => {
          const fTodos = data.filter((task) => task.status === "start");
          const fInProgress = data.filter((task) => task.status === "inprogress");
          const fClosed =  data.filter((task) => task.status === "closed");
          setTodos(fTodos);
          setInProgress(fInProgress);
          setClosed(fClosed);
        }, [data, userId]);
    
    const statuses = ["start", "inprogress", "closed"];
    
  return (
    <div className="d-flex justify-content-between  mx-4 my-5  gap-2 flex-wrap">
      {statuses.map((status, index) => (
        <Segment
          key={index}
          status={status}
          data={data}
          setData={setData}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default TaskDetails