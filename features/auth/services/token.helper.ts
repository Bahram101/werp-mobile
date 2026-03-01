import { authInstance } from "@/services/api/auth-instance";
import { AuthResponse } from "@/types/auth.interface";
import { getRefreshToken, saveAccessToken } from "./auth.storage";

export const getNewTokens = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token found");

    const body = new URLSearchParams();
    body.set("grant_type", "refresh_token");
    body.set("refresh_token", refreshToken);

    const { data } = await authInstance.post<AuthResponse>(
      "/token",
      body.toString(),
    );

    if (data.access_token) await saveAccessToken(data.access_token);

    return data;
  } catch (e) {
    console.log("Error new token", e);
    throw e;
  }
};
