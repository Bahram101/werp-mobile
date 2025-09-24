import { AxiosError } from "axios";

import { getAccessToken } from "@/features/auth/services/auth.storage";

import { logoutWithContext } from "@/features/auth/helpers/auth.helper-context";
import { AuthService } from "@/features/auth/services/auth.service";
import { getNewTokens } from "@/features/auth/services/token.helper";
import { coreInstance } from "./core-instance";

// export const authInstance = axios.create({
//   baseURL: AUTH_URL,
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     Authorization: "Basic V0VSUDpwYXNzd29yZA==",
//   },
// });

// const coreInstance = axios.create({
//   baseURL: CORE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

coreInstance.interceptors.request.use(async (config) => {
  console.log("REQ interceptors");
  const accessToken = await getAccessToken();
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

coreInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        await getNewTokens();
        console.log("getNewTokens success");
        return coreInstance.request(originalRequest);
      } catch (err) {
        console.log("Invalid Refresh Token", err);
        const refreshError = err as AxiosError<{ error: string }>;
        const errorMessage = refreshError.response?.data?.error;
        if (errorMessage === "invalid_token") {
          console.log("Invalid token, logging out");
          await logoutWithContext(AuthService.logout);
        }
      }
    }

    throw error;
  }
);

export default coreInstance;
