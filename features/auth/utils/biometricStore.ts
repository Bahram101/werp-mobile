import AsyncStorage from "@react-native-async-storage/async-storage";

import { EnumAsyncStorage } from "@/types/auth.interface";

export const isBiometricEnabled = async () => {
  const value = await AsyncStorage.getItem(EnumAsyncStorage.BIOMETRIC_ENABLED);
  return value === "true";
};

export const setBiometricEnabled = async (enabled: boolean) => {
  await AsyncStorage.setItem(
    EnumAsyncStorage.BIOMETRIC_ENABLED,
    String(enabled),
  );
};
