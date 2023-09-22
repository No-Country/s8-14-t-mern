import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://pigmeo-server.onrender.com/api/v1/pigmeo";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Interceptor de peticion Axios error", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
