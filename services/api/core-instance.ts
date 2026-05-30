import { getAccessToken } from "@/features/auth/services/auth.storage";
import axios from "axios";
import qs from "qs";
import { API_URL } from "./config";
import { setupAuthInterceptor } from "./setupAuthInterceptor";

export const coreInstance = axios.create({
  baseURL: `${API_URL}/core`,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  },
});

coreInstance.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: "repeat" });

coreInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const query = qs.stringify(config.params, { arrayFormat: "repeat" });
  const fullUrl = `${config.baseURL}${config.url}?${query}`;
  console.log("REQUEST_CORE:", fullUrl);
  return config;
});

setupAuthInterceptor(coreInstance);
