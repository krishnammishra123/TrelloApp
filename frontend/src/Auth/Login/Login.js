import React, { Suspense, lazy, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { LoginValidate } from '../Validation/Validation';
import { LoginAuth } from '../Service/Service';
import { toast } from 'react-toastify';
const Header = lazy(() => import("../../Page/Header/Header"));


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState({});


   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const validate = await LoginValidate(email, password);
       setError(validate);
       if (Object.keys(validate).length === 0) {
         const userdetails = { email,password  };
         await LoginAuth(userdetails).then((res) => {
           if (res.user.role === "user") {
              toast.success(res.massage, { position: toast.POSITION.TOP_RIGHT});
             localStorage.setItem("userToken", res.token)
             localStorage.setItem("role", res.user.role);
             localStorage.setItem("email", res.user.email);
             localStorage.setItem("id", res.user._id);
              setEmail("");
              setPassword("");
              navigate("/user");
           }
         });
       }
     } catch (err) {
       console.log(err);
     }
   };

  
  return (
    <>
      <Suspense fallback={<>loading....</>}>
        <Header />
      </Suspense>
      <div className="Login">
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <div className="text-center mb-3 ">
                  I don't have Register?
                  <span className="link-primary">
                    <Link to="/register">Sign Up </Link>
                  </span>
                </div>
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <span>{error.email}</span>}
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <span>{error.password}</span>}
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Forgot <Link to="#">password?</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login