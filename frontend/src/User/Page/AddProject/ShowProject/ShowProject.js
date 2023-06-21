import React from "react";
import "./ShowProject.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShowProject = ({ projectList, deleteProject }) => {
  const userID = localStorage.getItem("id");

  const navigate = useNavigate();

  const handleNavigation = (projectId) => {
    const invitedUserIDs = projectList.find(
      (data) => data._id === projectId
    )?.invitedUsers;
    if (invitedUserIDs && invitedUserIDs.includes(userID)) {
      navigate(`/user/project/${projectId}`);
    } else {
      toast.warn("You are not authorized");
    }
  };

  return (
    <div className="projectList">
      {projectList.length > 0 ? (
        projectList.map((data, index) => (
          <div key={index}>
            <h4 onClick={() => handleNavigation(data._id)} className="name">
              {data.projectName}
            </h4>
            <span
              className="mx-2 float-start"
              style={{ cursor: "pointer" }}
              title="delete Project"
              onClick={() => deleteProject(data._id)}
            >
              <i className="fa fa-trash-o"></i>
            </span>
            {data.userDetail && data.userDetail.name && (
              <div className="createrName" title={data.userDetail.name}>
                {data.userDetail.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <p className="notfound mx-5 mt-3">😔 Sorry No Projects Found......</p>
        </div>
      )}
    </div>
  );
};


export default ShowProject;
