import axios from "axios";

const apiEndPoint = import.meta.env.VITE_API_URL + "/api/v1/tasks";

export const postNewTask = async (taskObj) => {
  try {
    const { data } = await axios.post(apiEndPoint, taskObj);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getAllTask = async () => {
  try {
    const { data } = await axios.get(apiEndPoint);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTasks = async (ids) => {
  try {
    const { data } = await axios.delete(apiEndPoint, { data: ids });
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateTask = async (obj) => {
  try {
    const { data } = await axios.patch(apiEndPoint, obj);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
