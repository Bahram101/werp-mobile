import { getAccessToken } from "@/features/auth/services/auth.storage";
import axios from "axios";
import qs from "qs";
import { API_URL } from "./config";

export const serviceInstance = axios.create({
  baseURL: `${API_URL}/service`,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  },
});

serviceInstance.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: "repeat" });

serviceInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const query = qs.stringify(config.params, { arrayFormat: "repeat" });
  const fullUrl = `${config.baseURL}${config.url}?${query}`;

  // console.log("REQUEST:", fullUrl);
  return config;
});

serviceInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
