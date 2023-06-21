import React, { useEffect, useState } from 'react'
import Section from '../Section/Section';

const TaskList = ({ cardList, setCardList }) => {
   const [todos, setTodos] = useState([]);
   const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);
  const userId = localStorage.getItem("id");    
     
      useEffect(() => {                                                //        const fTodos = cardList.filter((task) => task.status === "start" && task.userId === userId);
        const fTodos = cardList.filter((task) => task.status === "start");
        const fInProgress = cardList.filter((task) => task.status === "inprogress");
        const fClosed = cardList.filter((task) => task.status === "closed");
        setTodos(fTodos);
        setInProgress(fInProgress);
        setClosed(fClosed);
      }, [cardList,userId]);
    
        const statuses = ["start", "inprogress", "closed"];

     
    return (
      <div className='d-flex justify-content-between  mx-4 my-5  gap-2 flex-wrap'>
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            cardList={cardList}
            setCardList={setCardList}
            todos={todos}
            inProgress={inProgress}
            closed={closed}
          />
        ))}
      </div>
    );
};

export default TaskList