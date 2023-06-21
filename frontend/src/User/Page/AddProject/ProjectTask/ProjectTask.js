import React, { useEffect, useState } from 'react'
import './ProjectTask.css';
import ProjectForm from '../ProjectForm/ProjectForm';
import ShowProject from '../ShowProject/ShowProject';
import { deleteProjectService, searchService } from '../../../Service/user.service';
import { toast } from 'react-toastify';
 

const ProjectTask = () => {
  const [projectList, setProjectList] = useState([]);
  const [search, setSearch] = useState("");
 

  useEffect(() => {
    const searchData = async () => {
      await searchService(search).then((res) => {
        setProjectList(res.details);
      }).catch((err) => {
        console.log(err);
      })
    }
    searchData()
   },[search])
 
const deleteProject = async(id) => {
  try {
    await deleteProjectService(id).then((res) => {
      toast.success("Project deleted successfully");
      setProjectList((prevList) => prevList.filter((product) => product._id !== id));
      });
  } catch (err) {
    console.log(err);
  }
}
 
  return (
    <div className='container1'>
      <div>
        <ProjectForm setProjectList={setProjectList} search={search} setSearch={setSearch}/>
      </div>
      <div  className='d-flex justify-content-center align-items-center '>
      <ShowProject projectList={projectList} setProjectList={setProjectList} deleteProject={deleteProject}  />
      </div>
    </div>
  );
}

export default ProjectTask