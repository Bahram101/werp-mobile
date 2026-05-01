import AsyncStorage from "@react-native-async-storage/async-storage";

import { authInstance } from "@/services/api/auth-instance";
import { AuthResponse, EnumAsyncStorage } from "@/types/auth.interface";
import Toast from "react-native-toast-message";
import { deleteTokensFromStorage, saveToStorage } from "./auth.storage";

export const AuthService = {
  async login(username: string, password: string) {
    try {
      const bodyFormData = new URLSearchParams({
        username,
        password,
      });

      const { data } = await authInstance.post<AuthResponse>(
        "/token",
        bodyFormData,
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
    const { data } = await authInstance.get("/userInfo");
    return data;
  },
};
