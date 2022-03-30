import axios from "axios";
import coreAxios from "../utils/axios";

export const loadHomework = async (id) => {
  try {
    const result = await coreAxios.get(`/courses/homework-details/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const addHomework = async (homeworkDetails) => {
  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/courses/homework/",
      homeworkDetails,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    // const result = await coreAxios.post("/courses/homework/", homeworkDetails);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadSingleHomework = async (id) => {
  try {
    const result = await coreAxios.get(`/courses/homework-details/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const updateHomework = async (id, data) => {
  try {
    const result = await axios.put(
      `http://127.0.0.1:8000/courses/homework-details/${id}`,
      data,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteHomework = async (id) => {
  try {
    const result = await coreAxios.delete(`/courses/homework-details/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};