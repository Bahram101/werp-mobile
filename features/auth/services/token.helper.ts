import { refreshInstance } from "@/services/api/refresh-instance";
import { AuthResponse } from "@/types/auth.interface";
import { getRefreshToken, saveAccessToken } from "./auth.storage";

export const getNewTokens = async () => {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const body = new URLSearchParams();
    body.set("grant_type", "refresh_token");
    body.set("refresh_token", refreshToken);

    const { data } = await refreshInstance.post<AuthResponse>(
      "/token/mobile",
      body.toString(),
    );

    if (data.access_token) {
      await saveAccessToken(data.access_token);
    }

    return data;
  } catch (e) {
    throw e;
  }
};
