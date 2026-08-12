import * as LocalAuthentication from "expo-local-authentication";

export const isBiometricSupported = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  console.log("hasHardware", hasHardware);
  if (!hasHardware) return false;
  console.log(
    "enrolledLevel",
    await LocalAuthentication.getEnrolledLevelAsync(),
  );

  return LocalAuthentication.isEnrolledAsync();
};

export const getBiometricLabel = async () => {
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  console.log("types", types);
  console.log(
    "LocalAuthentication",
    JSON.stringify(LocalAuthentication, null, 2),
  );
  if (
    types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
  ) {
    return "Face ID";
  }

  if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
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
