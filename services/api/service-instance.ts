import { getAccessToken } from "@/features/auth/services/auth.storage";
import axios from "axios";
import qs from "qs";
import { API_URL } from "./config";
import { setupAuthInterceptor } from "./setupAuthInterceptor";

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

  console.log("REQUEST_SERVICE:", fullUrl);
  return config;
});

setupAuthInterceptor(serviceInstance);
