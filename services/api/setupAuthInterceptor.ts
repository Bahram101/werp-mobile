import { logoutWithContext } from "@/features/auth/helpers/auth.helper-context";
import { AuthService } from "@/features/auth/services/auth.service";
import { getNewTokens } from "@/features/auth/services/token.helper";
import { AxiosError, AxiosInstance } from "axios";

export const setupAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._isRetry
      ) {
        originalRequest._isRetry = true;

        try {
          await getNewTokens();
          return instance.request(originalRequest);
        } catch (err) {
          console.log("catch err", err);
          const refreshError = err as AxiosError<{ error: string }>;
          const errorMessage = refreshError.response?.data?.error;
          if (errorMessage === "invalid_token") {
            await logoutWithContext(AuthService.logout);
          }
        }
      } else {
        console.log("else error", error);
      }

      throw error;
    },
  );
};
