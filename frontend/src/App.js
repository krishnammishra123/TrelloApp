import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
const Register = lazy(() => import("./Auth/Register/Register"));
const Login = lazy(() => import("./Auth/Login/Login"));
const Home = lazy(() => import("./Page/Home/Home"));
// const Dashboard = lazy(() => import("./User/Dashboard/Dashboard"));
const AddProject = lazy(() => import("./User/Page/AddProject/AddProject/AddProject"));
const Logout = lazy(() => import("./Page/Logout/Logout"));
const TaskBoard = lazy(() => import("./User/Page/AddTask/TaskBoard/TaskBoard"));
 

function App() {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<>Loading.....</>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/user" element={<AddProject />}></Route>
          {/* <Route path="/user/addproject" element={<Dashboard />}></Route> */}
          <Route path="/user/project/:id" element={<TaskBoard />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
