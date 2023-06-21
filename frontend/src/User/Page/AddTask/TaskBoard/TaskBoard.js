import "./TaskBoard.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { UserHomeAuth } from '../../../Service/user.service';
import { LoginContext } from '../../../../ContextProvider/Context';
import TaskDashboard from "../TaskDashboard/TaskDashboard";
 

const TaskBoard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { logindata, setLoginData } = useContext(LoginContext);
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");

    useEffect(() => {
    const verifyUser = async () => {
      try {
        await UserHomeAuth()
          .then((res) => {
            setLoginData(res.ValidUserOne);
            console.log("user Verify");
              navigate(`/user/project/${id}`);
          })
          .catch((err) => {console.log("user Verify");
            navigate("/login");
          });
      } catch (err) {
        console.log(err); 
      }
    };
    verifyUser();
  }, [navigate, setLoginData,id]);

  const handleDropdownToggle = () => {
    setOpen(!open);
  };

    if (!logindata || role !== "user") {
      return <Navigate to="/login" />;
    }

  return (
    <div>
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
            <TaskDashboard id={id} />
          </main>
        </div>
    </div>
  );
};

export default TaskBoard;
 