import coreAxios from "../utils/axios";
import axios from "axios";

export const handleSignup = async (userdata) => {
  console.log(userdata);
  try {
    const result = await coreAxios.post(`/accounts/registration/`, userdata);
    return result;
  } catch (error) {
    return error.response;
  }
};

export const handleSignin = async (userData) => {
  try {
    const result = await coreAxios.post("/accounts/login/", userData);

    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const handleAuthenticateStudent = async (studentInfo) => {
  try {
    const result = await coreAxios.post(
      "/accounts/authenticate-student/",
      studentInfo
    );
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadStudentsYearlyResult = async (username) => {
  try {
    const result = await coreAxios.get(
      `/results/students-yearly-result/${username}`
    );
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadClasswiseCourses = async () => {
  try {
    const result = await coreAxios.get("/courses/course-view/");
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadStudentsCourses = async (username) => {
  try {
    const result = await coreAxios.get(`/courses/student-courses/${username}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadProfile = async () => {
  try {
    const result = await coreAxios.get('/accounts/profile/');
    return result;
  } catch (error) {
    return error.response.data;
  }
};


export const loadStudentsContent = async (id) => {
  try {
    const result = await coreAxios.get(`/courses/course-content-details/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCourseContent = async (id) => {
  try {
    const result = await coreAxios.delete(`/courses/course-content-details/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadContentsVideo = async (id) => {
  try {
    const result = await coreAxios.get(`/courses/course-content-video-get/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadContentsFile = async (id) => {
  try {
    const result = await coreAxios.get(`/courses/course-content-file-details-by-content/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadContentsFileDelete = async (id) => {
  try {
    const result = await coreAxios.delete(`/courses/course-content-file-details/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadContentsVideoDelete = async (id) => {
  try {
    const result = await coreAxios.delete(`/courses/course-content-video-details/${id}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const loadStudentsCourseContents = async (courseID) => {
  try {
    const result = await coreAxios.get(`/courses/course-content-view/${courseID}`);
    return result;
  } catch (error) {
    return error.response.data;
  }
};


export const postStudentsCourseContent = async (values, video, files) => {
  try{
    const result = await coreAxios.post("/courses/course-content-post/", values);
    console.log("resultdt.....",result.data);

    if(video.length !== 0){
      video.forEach(async(item)=>{
        item.course_content = result.data.id;
        const video_result = await coreAxios.post("/courses/course-content-video-view/", item);
        
      })
    }
    if(files.length !== 0){
      files.forEach(async(item)=>{
        const form_data = new FormData();
        // console.log("asdfas", item.originFileObj)
        form_data.append("file", item.originFileObj);
        form_data.append("course_content", result.data.id);

            const fileresult = await axios.post(
            "http://127.0.0.1:8000/courses/course-content-file-view/",
            form_data,
            {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
              }
            }
          );
          console.log("hello dile", fileresult);
        // const filedata = {file: item, course_content:result.data.id};
        // const file_result = await coreAxios.post("/courses/course-content-file-view/", filedata);
      })
    }
    
  } catch (error) {
    return error.response.data;
  }
}

export const updateStudentsCourseContent = async (values, video, files, id) => {
  try{
    const result = await coreAxios.put(`/courses/course-content-details/${id}`, values);
    console.log("resultdt.....",result.data);

    if(video.length !== 0){
      video.forEach(async(item)=>{
        item.course_content = result.data.id;
        const video_result = await coreAxios.post("/courses/course-content-video-view/", item);
        
      })
    }

    if(files.length !== 0){
      files.forEach(async(item)=>{
        const form_data = new FormData();
        // console.log("asdfas", item.originFileObj)
        form_data.append("file", item.originFileObj);
        form_data.append("course_content", result.data.id);

            const fileresult = await axios.post(
            "http://127.0.0.1:8000/courses/course-content-file-view/",
            form_data,
            {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
              }
            }
          );
          console.log("hello dile", fileresult);
        // const filedata = {file: item, course_content:result.data.id};
        // const file_result = await coreAxios.post("/courses/course-content-file-view/", filedata);
      })
    }
    return result;
    
  } catch (error) {
    return error.response.data;
  }
}

