import axios, { AxiosInstance } from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    console.log("Interceptor de petición Axios error", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
