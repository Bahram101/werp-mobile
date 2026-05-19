import { getAccessToken } from "@/features/auth/services/auth.storage";
import axios from "axios";
import Constants from "expo-constants";
import qs from "qs";
export const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;

export const authInstance = axios.create({
  baseURL: SERVER_URL,
});

authInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const query = qs.stringify(config.params, { arrayFormat: "repeat" });
  const fullUrl = `${config.baseURL}${config.url}?${query}`;

  console.log("REQUEST_AUTH:", fullUrl);
  return config;
});
