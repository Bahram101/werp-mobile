import { getAccessToken } from "@/features/auth/services/auth.storage";
import axios from "axios";
import qs from "qs";
import { API_URL } from "./config";

export const serviceInstance = axios.create({
  baseURL: `${API_URL}/service`,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

serviceInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  console.log("token", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const fullUrl = config?.baseURL + config?.url;

  new URLSearchParams(config.params).toString();

  console.log("REQUEST:", fullUrl);
  return config;
});

serviceInstance.interceptors.response.use(
  (response) => {
    console.log("RESPONSE:", response.data);
    return response;
  },
  (error) => {
    console.log("ERROR STATUS:", error.response?.status);
    // console.log("ERROR DATA:", error.response?.data);
    return Promise.reject(error);
  },
);
