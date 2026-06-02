import { getAccessToken } from "@/features/auth/services/auth.storage";
import axios from "axios";
import qs from "qs";
// export const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;
// export const SERVER_URL = process.env.SERVER_URL;

import { AUTH_URL } from "./config";
import { setupAuthInterceptor } from "./setupAuthInterceptor";
console.log("AUTH_URL in auth-instance.ts", AUTH_URL);

export const authInstance = axios.create({
  baseURL: AUTH_URL,
  // timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic V0VSUDpwYXNzd29yZA==",
  },
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

setupAuthInterceptor(authInstance);
