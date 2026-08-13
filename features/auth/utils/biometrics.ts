import * as LocalAuthentication from "expo-local-authentication";

export const isBiometricSupported = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return false;

  return LocalAuthentication.isEnrolledAsync();
};

export const getBiometricLabel = async () => {
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const authTypes = LocalAuthentication.AuthenticationType;

  if (types.includes(authTypes.FACIAL_RECOGNITION)) {
    return "Face ID";
  }

  if (types.includes(authTypes.FINGERPRINT)) {
    return "отпечатку пальца";
  }

  return "биометрии";
};

export const authenticateWithBiometrics = async () => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Подтвердите вход",
      cancelLabel: "Отмена",
      disableDeviceFallback: true,
    });

    if (!result.success) {
      console.warn("Biometric auth failed:", result.error);
    }

    return result.success;
  } catch (error) {
    console.warn("Biometric auth threw:", error);
    return false;
  }
};
