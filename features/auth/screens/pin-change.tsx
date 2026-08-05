import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { PinScreenLayout } from "@/features/auth/components/PinScreenLayout";
import { usePinDigitInput } from "@/features/auth/hooks/usePinDigitInput";
import { getPinCode, savePinCode } from "@/features/auth/utils/pinStore";

const PIN_LENGTH = 4;
const MISMATCH_RESET_DELAY = 800;

type Step = "verify" | "create" | "confirm";

const TITLES: Record<Step, string> = {
  verify: "Введите текущий PIN-код",
  create: "Придумайте новый PIN-код",
  confirm: "Повторите новый PIN-код",
};

const SUBTITLES: Record<Step, string> = {
  verify: "Подтвердите личность, чтобы изменить PIN-код",
  create: "Он понадобится для быстрого входа в приложение",
  confirm: "Введите новый PIN-код ещё раз",
};

const PinChange = () => {
  const [step, setStep] = useState<Step>("verify");
  const [newPin, setNewPin] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { input, handlePressDigit, handleBackspace, reset } =
    usePinDigitInput(PIN_LENGTH);

  useEffect(() => {
    if (input.length !== PIN_LENGTH || hasError) return;

    const handleComplete = async () => {
      if (step === "verify") {
        const savedPin = await getPinCode();

        if (input !== savedPin) {
          setErrorMessage("Неверный текущий PIN-код");
          setHasError(true);
          setTimeout(() => {
            reset();
            setHasError(false);
          }, MISMATCH_RESET_DELAY);
          return;
        }

        reset();
        setStep("create");
        return;
      }

      if (step === "create") {
        setNewPin(input);
        reset();
        setStep("confirm");
        return;
      }

      if (input !== newPin) {
        setErrorMessage("PIN-коды не совпадают, попробуйте снова");
        setHasError(true);
        setTimeout(() => {
          setStep("create");
          setNewPin("");
          reset();
          setHasError(false);
        }, MISMATCH_RESET_DELAY);
        return;
      }

      await savePinCode(input);
      Toast.show({ type: "success", text1: "PIN-код изменён" });
      router.back();
    };

    handleComplete();
  }, [input, step, newPin, hasError, reset]);

  return (
    <PinScreenLayout
      title={TITLES[step]}
      subtitle={hasError ? errorMessage : SUBTITLES[step]}
      hasError={hasError}
      pinLength={PIN_LENGTH}
      filled={input.length}
      onPressDigit={handlePressDigit}
      onBackspace={handleBackspace}
    />
  );
};

export default PinChange;
