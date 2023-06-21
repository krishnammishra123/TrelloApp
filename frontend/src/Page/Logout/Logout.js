import React, { useContext, useEffect } from 'react'
import { LoginContext } from '../../ContextProvider/Context';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    setLoginData(false)
    navigate("/login");
  })
  return (
    <div>Logout</div>
  )
}

export default Logout