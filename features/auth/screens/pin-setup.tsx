import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

import { PinScreenLayout } from "@/features/auth/components/PinCode/PinScreenLayout";
import {
  MISMATCH_RESET_DELAY,
  PIN_LENGTH,
} from "@/features/auth/constants/pin";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePinDigitInput } from "@/features/auth/hooks/usePinDigitInput";
import { savePinCode } from "@/features/auth/utils/pinStore";

type Step = "create" | "confirm";

const PinSetup = () => {
  const { setPinVerified } = useAuth();
  const [step, setStep] = useState<Step>("create");
  const [firstPin, setFirstPin] = useState("");
  const [hasError, setHasError] = useState(false);
  const { input, handlePressDigit, handleBackspace, reset } =
    usePinDigitInput(PIN_LENGTH);

  useEffect(() => {
    if (input.length !== PIN_LENGTH || hasError) return;

    if (step === "create") {
      setFirstPin(input);
      reset();
      setStep("confirm");
      return;
    }

    if (input !== firstPin) {
      setHasError(true);
      setTimeout(() => {
        setStep("create");
        setFirstPin("");
        reset();
        setHasError(false);
      }, MISMATCH_RESET_DELAY);
      return;
    }

    savePinCode(input).then(() => {
      setPinVerified(true);
      router.replace("/(apps)/master");
    });
  }, [input, step, firstPin, hasError, reset, setPinVerified]);

  const handleSkip = () => {
    setPinVerified(true);
    router.replace("/(apps)/master");
  };

  const title = step === "create" ? "Придумайте PIN-код" : "Повторите PIN-код";
  const subtitle = hasError
    ? "PIN-коды не совпадают, попробуйте снова"
    : "Он понадобится для быстрого входа в приложение";

  return (
    <PinScreenLayout
      title={title}
      subtitle={subtitle}
      hasError={hasError}
      pinLength={PIN_LENGTH}
      filled={input.length}
      onPressDigit={handlePressDigit}
      onBackspace={handleBackspace}
      footer={
        <Pressable onPress={handleSkip} className="mt-6 py-2">
          <Text className="text-base text-grayDark underline">
            Пропустить настройку
          </Text>
        </Pressable>
      }
    />
  );
};

export default PinSetup;
