import AsyncStorage from "@react-native-async-storage/async-storage";

import { apiInstance } from "@/services/api/auth-instance";
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

      const { data } = await apiInstance.post<AuthResponse>(
        "/token/mobile",
        bodyFormData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic V0VSUDpwYXNzd29yZA==",
          },
        },
      );

      if (data.access_token) {
        await saveToStorage(data);
      }

      return data;
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Request error",
        text2: apiInstance.defaults.baseURL || "EMPTY",
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
      const { data } = await apiInstance.get("/userInfo");
      return data;
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  },
};
