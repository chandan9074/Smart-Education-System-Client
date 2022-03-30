import coreAxios from "../utils/axios";

export const loadHomework = async (id) => {
  try {
    const result = await coreAxios.get(`/courses/homework-details/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};
