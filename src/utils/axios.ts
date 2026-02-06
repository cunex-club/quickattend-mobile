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
    const clientId = process.env.NEXT_PUBLIC_LLE_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_LLE_CLIENT_SECRET;

    if (clientId && clientSecret) {
      config.headers["ClientId"] = clientId;
      config.headers["ClientSecret"] = clientSecret;
    }

    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
Axios.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error?.response?.data ?? error);
  }
);

export default Axios;
