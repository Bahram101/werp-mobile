import { logoutWithContext } from "@/features/auth/helpers/auth.helper-context";
import { AuthService } from "@/features/auth/services/auth.service";
import { getAccessToken } from "@/features/auth/services/auth.storage";
import { getNewTokens } from "@/features/auth/services/token.helper";
import axios, { AxiosError } from "axios";
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

  console.log("REQUEST_SERVICE:", fullUrl);
  return config;
});

serviceInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        await getNewTokens();
        return serviceInstance.request(originalRequest);
      } catch (err) {
        const refreshError = err as AxiosError<{ error: string }>;
        const errorMessage = refreshError.response?.data?.error;
        if (errorMessage === "invalid_token") {
          await logoutWithContext(AuthService.logout);
        }
      }
    }

    throw error;
  },
);
