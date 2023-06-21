import React, { useState } from 'react'
import CreateTask from '../CreateTask/CreateTask'
import TaskList from '../TaskList/TaskList';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const Board = () => {
  const [cardList, setCardList] = useState([]);
  
  
   
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container'></div>
    <div className='gap-50 d-flex flex-column bg-slate-500 '>
      <CreateTask setCardList={setCardList} />
      <TaskList cardList={cardList} setCardList={setCardList} />
      </div>
      </DndProvider>
  );
}

export default Board


 
 