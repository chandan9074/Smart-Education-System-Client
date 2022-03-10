import axios from "axios";

const coreAxios = axios.create({
  // baseURL: process.env.REACT_APP_SERVICE_URL,
  baseURL: "http://127.0.0.1:8000",
});
console.log(process.env.REACT_APP_SERVICE_URL);

export default coreAxios;

coreAxios.interceptors.request.use(function (req) {
  let token = localStorage.getItem("token");

  if (token) {
    req.headers.authorization = "Token " + JSON.parse(token);
  }

  return req;
});
