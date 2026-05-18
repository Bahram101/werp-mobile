import { getAccessToken } from "@/features/auth/services/auth.storage";
import axios from "axios";
import Constants from "expo-constants";
import qs from "qs";
export const TEST_SERVER_URL = Constants.expoConfig?.extra?.TEST_SERVER_URL;
export const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;
// import { SERVER_URL } from "./config";

export const testAuthInstance = axios.create({
  baseURL: TEST_SERVER_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic V0VSUDpwYXNzd29yZA==",
  },
});

export const authInstance = axios.create({
  baseURL: SERVER_URL,
});

testAuthInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token && config.url !== "/oauth/token") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // const token = await getAccessToken();
  // console.log("token", token);
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  const query = qs.stringify(config.params, { arrayFormat: "repeat" });
  const fullUrl = `${config.baseURL}${config.url}?${query}`;

  console.log("testAuthInstance REQUEST:", fullUrl);
  return config;
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
