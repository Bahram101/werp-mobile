import { getAccessToken } from "@/features/auth/services/auth.storage";
import axios from "axios";
import { API_URL } from "./config";

export const serviceInstance = axios.create({
  baseURL: `${API_URL}/service`,
});

serviceInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
