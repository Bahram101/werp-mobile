import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import { PinScreenLayout } from "@/features/auth/components/PinScreenLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePinDigitInput } from "@/features/auth/hooks/usePinDigitInput";
import { getPinCode } from "@/features/auth/utils/pinStore";

const PIN_LENGTH = 4;
const MISMATCH_RESET_DELAY = 500;

const PinUnlock = () => {
  const { setPinVerified } = useAuth();
  const [hasError, setHasError] = useState(false);
  const { input, handlePressDigit, handleBackspace, reset } =
    usePinDigitInput(PIN_LENGTH);

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
    />
  );
};

export default PinUnlock;
