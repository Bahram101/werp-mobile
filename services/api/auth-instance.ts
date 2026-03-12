import { getAccessToken } from "@/features/auth/services/auth.storage";
import axios from "axios";
import { SERVER_URL } from "./config";

export const authInstance = axios.create({
  baseURL: SERVER_URL,
});

authInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
