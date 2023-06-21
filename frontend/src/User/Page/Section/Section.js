import React from 'react'
import "./Section.css";
import Header from '../Header/Header';
import Task from '../Task/Task';
import { useDrop } from 'react-dnd';
import { updateService } from '../../Service/user.service';
 

const Section = ({ status, cardList, setCardList, todos, inProgress, closed }) => {
    

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      drop: (item) => addItemToSection(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

  const addItemToSection = async (id) => {
       const updatedTask = {status:status}
    await updateService(updatedTask, id).then((res) => {
      console.log("update Status Successfully")
       setCardList((prev) => {
         const mTasks = prev.map((t) => {
           if (t._id === id) {
             return { ...t, status: status };
           }
           return t;
         });
         return mTasks;
       });
    }).catch((err) => {
      console.log(err);
    })
    };

    let text = "Start";
    let tasksToMap = todos;
    if (status === "inprogress") {
    text = "inProgress";
    tasksToMap = inProgress;  
    } else if (status === "closed") {
    text = "closed";
    tasksToMap = closed;
    }
    
    return (
      <div ref={drop} className={`p-3 ${ isOver ? "bg-slate-100" : ""}`} style={{ backgroundColor:"darkgray" ,borderRadius:"5px" ,flexWrap:"wrap"}}  >
        <Header text={text} count={tasksToMap.length} />
        {tasksToMap.length > 0 &&
          tasksToMap.map((task) => (
            <Task
              key={task._id}
              task={task}
              cardList={cardList}
              setCardList={setCardList}
            />
          ))}
      </div>
    );
};

export default Section