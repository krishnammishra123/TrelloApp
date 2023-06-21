import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";

// Create a new instance of Axios with default config
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

// Add a request interceptor to handle errors globally
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Return successful response data
    if (response.status === 200) {
      return response.data;
    }
  },
  (error) => {
    // Handle errors globally
    if (error.response.status === 400) {
      swal({
        title: "Wrong Entry",
        text: error.response.data.massage,
        icon: "warning",
        button: "Ok",
      });
    } else if (error.response.status === 401) {
      toast.success(error.response.data.massage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (error.response.status === 403) {
      swal({
        title: "Wrong Entry",
        text: error.response.data.massage,
        icon: "warning",
        button: "Ok",
      });
    } else if (error.response.status === 404) {
      swal({
        title: "Wrong Entry",
        text: error.response.data.massage,
        icon: "warning",
        button: "Ok",
      });
    } else if (error.response.status === 409) {
      swal({
        title: "Wrong Entry",
        text: error.response.data.massage,
        icon: "warning",
        button: "Ok",
      });
    } else {
      swal({
        title: "Wrong Entry",
        text: error.response.data.massage,
        icon: "warning",
        button: "Ok",
      });
    }
    // Return a rejected Promise so that calling code can handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
