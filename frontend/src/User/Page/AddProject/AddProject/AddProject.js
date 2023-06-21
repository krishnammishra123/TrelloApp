import "./AddProject.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserHomeAuth } from "../../../Service/user.service";
import { LoginContext } from "../../../../ContextProvider/Context";
import ProjectTask from "../ProjectTask/ProjectTask";

const AddProject = () => {
  
  const { logindata, setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");


   useEffect(() => {
    const verifyUser = async () => {
      try {
        await UserHomeAuth().then((res) => {
           setLoginData(res.ValidUserOne);
           console.log("user Verify");
           navigate("/user");
        }).catch((err) => {
           navigate("/login");
        })
      }catch(err) {
        console.log(err); 
      }
    };
    verifyUser();
   }, [navigate, setLoginData]);
  
  
    if (!logindata || role !== "user") {
     return <Navigate to="/login" />;
    }



  const handleDropdownToggle = () => {
    setOpen(!open);
  };


  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-left">TreLLo</div>
        <div className="header-right mx-3" onClick={handleDropdownToggle}>
          {logindata.name.charAt(0)}
          {open && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link to="#">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className="sidebar ">
        <ul className="menu">
          <li>
            <Link to="/user">Dashboard</Link>
          </li>
          <li>
            <Link to="#">ManageUsers</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </aside>
      <main className="content">
        <ProjectTask />
      </main>
    </div>
  );
};

export default AddProject;
