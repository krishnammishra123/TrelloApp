import axiosInstance from "../../Interceptor/Interceptors";





//userHome verify
export const UserHomeAuth = async () => {
  const res = await axiosInstance.get("/user/validuser");
  return res;
};

//get user detail
export const getUserService = async () => {
  const res = await axiosInstance.get("/user/finduser");
  return res;
};

 //add Project
export const projectService = async (data) => {
  const res = await axiosInstance.post("/user/addproject", data);
  return res;
};
//getName
export const getUserName = async (userId) => {
  const res = await axiosInstance.get(`/user/find/${userId}`);
  return res;
};
//get addcard list
export const getProjectService = async () => {
  const res = await axiosInstance.get("/user/getprojectdata");
  return res;
};

//get addcard list
export const getTaskService = async (id) => {
  const res = await axiosInstance.get(`/user/gettaskdata/${id}`);
  return res;
};


 //add task
export const taskService = async(data ) => {
  const res = await axiosInstance.post("/user/createtask",data);
  return res;
};
//get  Task list
export const getTaskListService = async (id) => {
  const res = await axiosInstance.get(`/user/gettasklistdata/${id}`);
  return res;
};

//update updatetStatusService
export const updatetStatusService = async (updatedTask, id) => {
  const res = await axiosInstance.put(`/user/updatetaskstatus/${id}`, updatedTask);
  return res;
};

//delete Project
export const deleteProjectService = async (id) => { 
  const res = await axiosInstance.delete(`/user/deleteproject/${id}`);
  return res;
}

//delete Task
export const deleteTaskService = async (id) => {
  const res = await axiosInstance.delete(`/user/deletetask/${id}`);
  return res;
};

//searchService
export const searchService = async (search) => {
  try {
    const res = await axiosInstance.get(`/user/searchproject?search=${search}`);
    return res; // Return res.data.data instead of res.data
  } catch (error) {
    console.log(error);
  }
};


 //add  card
export const cardService = async(data ) => {
  const res = await axiosInstance.post("/user/addTask",data);
  return res;
};

//get addcard list
export const getListService = async () => {
  const res = await axiosInstance.get("/user/getdata");
  return res;
};

export const updateService = async (updatedTask, id) => {
  const res = await axiosInstance.put(`/user/updatestatus/${id}`, updatedTask);
  return res;
};