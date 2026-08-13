import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

import { PinScreenLayout } from "@/features/auth/components/PinCode/PinScreenLayout";
import {
  MISMATCH_RESET_DELAY,
  PIN_LENGTH,
} from "@/features/auth/constants/pin";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePinDigitInput } from "@/features/auth/hooks/usePinDigitInput";
import { isBiometricEnabled } from "@/features/auth/utils/biometricStore";
import {
  authenticateWithBiometrics,
  getBiometricLabel,
  isBiometricSupported,
} from "@/features/auth/utils/biometrics";
import { getPinCode } from "@/features/auth/utils/pinStore";

const PinUnlock = () => {
  const { setPinVerified } = useAuth();
  const [hasError, setHasError] = useState(false);
  const [biometricLabel, setBiometricLabel] = useState<string | null>(null);
  const [enabled, setBiometricEnabledState] = useState(false);
  const { input, handlePressDigit, handleBackspace, reset } =
    usePinDigitInput(PIN_LENGTH);

  const unlockWithBiometrics = useCallback(async () => {
    const success = await authenticateWithBiometrics();
    if (!success) return;

    setPinVerified(true);
    router.replace("/(apps)/master");
  }, [setPinVerified]);

  useEffect(() => {
    const init = async () => {
      const [enabled, supported] = await Promise.all([
        isBiometricEnabled(),
        isBiometricSupported(),
      ]);
      setBiometricEnabledState(enabled);

      if (!enabled || !supported) return;

      setBiometricLabel(await getBiometricLabel());
      unlockWithBiometrics();
    };

    init();
  }, [unlockWithBiometrics]);

  useEffect(() => {
    if (input.length !== PIN_LENGTH || hasError) return;

    const verify = async () => {
      const savedPin = await getPinCode();

      if (input !== savedPin) {
        setHasError(true);
        setTimeout(() => {
          reset();
          setHasError(false);
        }, MISMATCH_RESET_DELAY);
        return;
      }

      setPinVerified(true);
      router.replace("/(apps)/master");
    };

    verify();
  }, [input, hasError, reset, setPinVerified]);

  return (
    <PinScreenLayout
      title="Введите PIN-код"
      subtitle={hasError ? "Неверный PIN-код" : "Разблокируйте приложение"}
      hasError={hasError}
      pinLength={PIN_LENGTH}
      filled={input.length}
      onPressDigit={handlePressDigit}
      onBackspace={handleBackspace}
      footer={
        enabled &&
        biometricLabel && (
          <Pressable onPress={unlockWithBiometrics} className="mt-6 py-2">
            <Text className="text-base text-primary underline">
              Войти по {biometricLabel}
            </Text>
          </Pressable>
        )
      }
    />
  );
};

export default PinUnlock;
