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
