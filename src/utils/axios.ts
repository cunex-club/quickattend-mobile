import axios from "axios";
import { BASE_API } from "./env";

const Axios = axios.create({
  baseURL: BASE_API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
Axios.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error?.response?.data ?? error);
  }
);

export default Axios;
