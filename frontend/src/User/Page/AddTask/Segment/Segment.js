import React from 'react'
import "./Segment.css";
import StatusHeader from '../StatusHeader/StatusHeader';
import TaskDisplay from '../TaskDisplay/TaskDisplay';
import { useDrop } from 'react-dnd';
import { updatetStatusService } from '../../../Service/user.service';
import { toast } from 'react-toastify';

const Segment = ({ status, data, setData, todos, inProgress, closed }) => {

   const [{ isOver }, drop] = useDrop(() => ({
     accept: "task",
     drop: (item) => addItemToSection(item.id),
     collect: (monitor) => ({
       isOver: !!monitor.isOver(),
     }),
   }));

    const addItemToSection = async (id) => {
      const updatedTask = { status: status };
      await updatetStatusService(updatedTask, id).then((res) => {
        console.log("update Status Successfully");
        toast.success("user Update Successfully");
          setData((prev) => {
            const mTasks = prev.map((t) => {
              if (t._id === id) {
                return { ...t, status: status };
              }
              return t;
            });
            return mTasks;
          });
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
      <div ref={drop} className={`p-3 ${ isOver ? "bg-slate-100" : ""}`} style={{ backgroundColor: "darkgray", borderRadius: "5px", flexWrap: "wrap" }}>
          <StatusHeader text={text} count={tasksToMap.length} />
          {tasksToMap.length > 0 &&
          tasksToMap.map((task) => (
            <TaskDisplay key={task._id} task={task} data={data} setData={setData}/>
          ))}
     </div>
  )
}

export default Segment