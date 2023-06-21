import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css';
import { UserHomeAuth } from '../Service/user.service';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../ContextProvider/Context';
import Board from "../Page/Board/Board";

  const Dashboard = () => {
    const navigate = useNavigate();
    const { logindata, setLoginData } = useContext(LoginContext);
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
              });
          }catch (err) {
            console.log(err);
          }
        };
        verifyUser();
      }, [navigate, setLoginData]);
    
    const handleDropdownToggle = () => {
        setOpen(!open);
    }

  return (
    <div>
      {logindata && role === "user" ? (
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
            <ul className='menu'>
              <li>
                <Link to="/user">Dashboard</Link>
              </li>
              <li>
                <Link to="/user/addproject">Add Project</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </aside>
          <main className="content"><Board /></main>
        </div>
      ) : (
        navigate("/login")
      )}
    </div>
  );
}

export default Dashboard