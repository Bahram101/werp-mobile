import AsyncStorage from "@react-native-async-storage/async-storage";

import { errorCatch } from "@/services/api/error";
import { authInstance } from "@/services/api/interceptors";
import { EnumAsyncStorage, IAuthResponse } from "@/types/auth.interface";
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

      const { data } = await authInstance.post<IAuthResponse>(
        "/oauth/token",
        bodyFormData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic V0VSUDpwYXNzd29yZA==",
          },
        }
      );

      console.log('data',data)

      if (data.access_token) {
        await saveToStorage(data);
      }

      return data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Request error",
        text2: errorCatch(error),
      });
      throw error;
    }
  },

  async logout() {
    await deleteTokensFromStorage();
    await AsyncStorage.removeItem(EnumAsyncStorage.USER);
  },
};
