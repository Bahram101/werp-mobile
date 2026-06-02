import AsyncStorage from "@react-native-async-storage/async-storage";

import { authInstance } from "@/services/api/auth-instance";
// import coreInstance from "@/services/api/interceptors22";
import { coreInstance } from "@/services/api/core-instance";
import { AuthResponse, EnumAsyncStorage } from "@/types/auth.interface";
import Toast from "react-native-toast-message";
import { deleteTokensFromStorage, saveToStorage } from "./auth.storage";

export const AuthService = {
  async login(username: string, password: string) {
    try {
      const bodyFormData = new URLSearchParams({
        username,
        password,
        grant_type: "password",
      });

      // const { data } = await authInstance.post<AuthResponse>(
      //   "/token",
      //   bodyFormData,
      // );

      const { data } = await authInstance.post<AuthResponse>(
        "/oauth/token",
        bodyFormData.toString(),
      );

      if (data.access_token) {
        await saveToStorage(data);
      }

      return data;
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Request error",
        text2: authInstance.defaults.baseURL || "EMPTY",
      });
      throw error;
    }
  },

  async logout() {
    await deleteTokensFromStorage();
    await AsyncStorage.removeItem(EnumAsyncStorage.USER);
  },

  async getUserInfo() {
    try {
      const { data } = await coreInstance.get("/api/core/reference/userInfo");
      return data;
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  },
};
