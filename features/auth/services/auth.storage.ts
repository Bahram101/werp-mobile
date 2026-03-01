import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

import {
  AuthResponse,
  EnumAsyncStorage,
  EnumSecureStore,
  ITokens,
} from "@/types/auth.interface";

import { removePinCode } from "../utils/pinStore";

export const getAccessToken = async () => {
  const accessToken = await getItemAsync(EnumSecureStore.ACCESS_TOKEN);
  return accessToken || null;
};

export const getRefreshToken = async () => {
  const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN);
  return refreshToken || null;
};

export const getUserFromStorage = async () => {
  try {
    return JSON.parse(
      (await AsyncStorage.getItem(EnumAsyncStorage.USER)) || "{}",
    );
  } catch (error) {
    return null;
  }
};

export const saveAccessToken = async (token: string) => {
  await setItemAsync(EnumSecureStore.ACCESS_TOKEN, token);
};

export const saveTokensToStorage = async (data: ITokens) => {
  await setItemAsync(EnumSecureStore.ACCESS_TOKEN, data.access_token);
  await setItemAsync(EnumSecureStore.REFRESH_TOKEN, data.refresh_token);
};

export const deleteTokensFromStorage = async () => {
  await deleteItemAsync(EnumSecureStore.ACCESS_TOKEN);
  await deleteItemAsync(EnumSecureStore.REFRESH_TOKEN);
  await removePinCode();
};

export const saveToStorage = async (data: AuthResponse) => {
  await saveTokensToStorage(data);
  try {
    await AsyncStorage.setItem(
      EnumAsyncStorage.USER,
      JSON.stringify({
        user_full_name: data.user_full_name,
        user_id: data.user_id,
      }),
    );
  } catch (error) {}
};
