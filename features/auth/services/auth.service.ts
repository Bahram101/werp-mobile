import AsyncStorage from "@react-native-async-storage/async-storage";

import { authInstance, testAuthInstance } from "@/services/api/auth-instance";
import { EnumAsyncStorage } from "@/types/auth.interface";
import qs from "qs";
import Toast from "react-native-toast-message";
import { deleteTokensFromStorage, saveToStorage } from "./auth.storage";

export const AuthService = {
  async login(username: string, password: string) {
    console.log("AuthService.login", username, password);
    try {
      // const bodyFormData = new URLSearchParams({
      //   username,
      //   password,
      // });

      // const { data } = await authInstance.post<AuthResponse>(
      //   "/token",
      //   bodyFormData,
      // );

      //////////////////////////////////////////////////////////////////////////////////////

      const body = qs.stringify({
        username,
        password,
        grant_type: "password",
      });

      const { data } = await testAuthInstance.post("/oauth/token", body);

      console.log("RES_DATA", JSON.stringify(data, null, 2));

      if (data.access_token) {
        await saveToStorage(data);
      }

      return data;
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Request error",
        text2: testAuthInstance.defaults.baseURL || "EMPTY",
      });

      throw error;
    }
  },

  async logout() {
    await deleteTokensFromStorage();
    await AsyncStorage.removeItem(EnumAsyncStorage.USER);
  },

  async getUserInfo() {
    console.log("getUserInfo");
    console.log("authInstance", authInstance.defaults.baseURL);
    const { data } = await authInstance.get("/userInfo");
    console.log("data", data);
    return data;
  },
};
