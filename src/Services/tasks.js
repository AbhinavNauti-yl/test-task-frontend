import axios from "axios";

const getAllTasks = async (search='') => {
  try {
    const data = await axios.get(`https://test-task-backend-bqk9.onrender.com/api/task?search=${search}`);
    return data.data.data;
  } catch (error) {}
};

const getBoardTasks = async (id) => {
  try {
    const data = await axios.get(`https://test-task-backend-bqk9.onrender.com/api/board/:${id}/task`);
    return data.data.data;
  } catch (error) {}
};

const getParticularTasks = async (id, taskId) => {
  try {
    const data = await axios.get(`https://test-task-backend-bqk9.onrender.com/api/board/:${id}/task/:${taskId}`);
    return data.data.data;
  } catch (error) {}
};

const updateParticularTasks = async (id, taskId, taskData) => {
  try {
    const data = await axios.put(`https://test-task-backend-bqk9.onrender.com/api/board/:${id}/task/:${taskId}`, taskData);
    return data.data.data;
  } catch (error) {}
};

const deleteTask = async (id) => {
  try {
    const data = await axios.delete(`https://test-task-backend-bqk9.onrender.com/api/task/${id}`);
    return data.data.data;
  } catch (error) {}
};

const createTask = async (taskData, id) => {
  try {
    const data = await axios.post(`https://test-task-backend-bqk9.onrender.com/api/board/:${id}/task`, taskData);
    return data.data.data;
  } catch (error) {}
};

export {
  getAllTasks,
  deleteTask,
  getBoardTasks,
  createTask,
  getParticularTasks,
  updateParticularTasks,
};
