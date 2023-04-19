import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

//Set Bearer token
axiosClient.interceptors.request.use(function (config) {
  const access_token = localStorage.getItem("access_token");
  config.headers.Authorization = access_token ? `Bearer ${access_token}` : "";
  return config;
});

export default axiosClient;