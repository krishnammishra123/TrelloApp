import  { Suspense, lazy, useState } from 'react'
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationValidate } from '../Validation/Validation';
import { RegisterAuth } from '../Service/Service';
import swal from "sweetalert";
const Header = lazy(() => import("../../Page/Header/Header"));

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [error, setError] = useState({});
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
   const  validate=  await RegistrationValidate(name, email, password, mobile);
      setError(validate);
      if (Object.keys(validate).length === 0) {
        const userdetails = { name, email, password, mobile };
      await RegisterAuth(userdetails).then((res) => {
          swal({ title: "Success", text:res.data.massage, icon: "success", button: "Ok" });
          navigate("/login");
          setName("");
          setEmail("");
          setPassword("");
          setMobile("");
      }).catch((err) => {
         if (err.response.status === 400) {
             swal({title: "Wrong Entry", text: err.response.data.massage,  icon: "warning", button: "Ok"});
          } else if (err.response.status === 409) {
              swal({title: "Wrong Entry", text: err.response.data.massage,  icon: "warning", button: "Ok"});
          } else {
             swal({title: "Wrong Entry", text: err.response.data.massage,  icon: "warning", button: "Ok"});
          }
      })
      }
    } catch (err) {
      console.log(err)
    }
    
  }
  return (
    <>
      <Suspense fallback={<>loading....</>}>
        <Header />
      </Suspense>
      <div className="register">
        <div className="Auth-form-container">
          <form className="Auth-form " onSubmit={handleSubmit}>
            <div className="Auth-form-content ">
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="text-center">
                Already registered?
                <span className="link-primary">
                  <Link to="/login">Sign In</Link>
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                {error && <span>{error.name}</span>}
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <span>{error.email}</span>}
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <span>{error.password}</span>}
              </div>
              <div className="form-group mt-3">
                <label>Mobile</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Number"
                  onChange={(e) => setMobile(e.target.value)}
                />
                {error && <span>{error.mobile}</span>}
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <Link to="#">password?</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register