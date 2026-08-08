import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { Loader } from "@/components/ui/Loader";
import { PinScreenLayout } from "@/features/auth/components/PinCode/PinScreenLayout";
import {
  MISMATCH_RESET_DELAY,
  PIN_LENGTH,
} from "@/features/auth/constants/pin";
import { usePinDigitInput } from "@/features/auth/hooks/usePinDigitInput";
import { getPinCode, savePinCode } from "@/features/auth/utils/pinStore";

type Step = "verify" | "create" | "confirm";

const PinManage = () => {
  const [step, setStep] = useState<Step | null>(null);
  const [hadExistingPin, setHadExistingPin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { input, handlePressDigit, handleBackspace, reset } =
    usePinDigitInput(PIN_LENGTH);

  useEffect(() => {
    const init = async () => {
      const savedPin = await getPinCode();
      setHadExistingPin(!!savedPin);
      setStep(savedPin ? "verify" : "create");
    };

    init();
  }, []);

  useEffect(() => {
    if (!step || input.length !== PIN_LENGTH || hasError) return;

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
      Toast.show({
        type: "success",
        text1: hadExistingPin ? "PIN-код изменён" : "PIN-код установлен",
      });
      router.back();
    };

    handleComplete();
  }, [input, step, newPin, hasError, reset, hadExistingPin]);

  if (!step) {
    return <Loader />;
  }

  const title =
    step === "verify"
      ? "Введите текущий PIN-код"
      : step === "create"
        ? hadExistingPin
          ? "Придумайте новый PIN-код"
          : "Придумайте PIN-код"
        : hadExistingPin
          ? "Повторите новый PIN-код"
          : "Повторите PIN-код";

  const defaultSubtitle =
    step === "verify"
      ? "Подтвердите личность, чтобы изменить PIN-код"
      : step === "create"
        ? "Он понадобится для быстрого входа в приложение"
        : "Введите PIN-код ещё раз";

  return (
    <PinScreenLayout
      title={title}
      subtitle={hasError ? errorMessage : defaultSubtitle}
      hasError={hasError}
      pinLength={PIN_LENGTH}
      filled={input.length}
      onPressDigit={handlePressDigit}
      onBackspace={handleBackspace}
    />
  );
};

export default PinManage;
