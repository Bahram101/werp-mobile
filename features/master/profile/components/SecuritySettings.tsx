import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";

import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import { COLORS } from "@/constants/theme";
import {
  isBiometricEnabled,
  setBiometricEnabled,
} from "@/features/auth/utils/biometricStore";
import {
  getBiometricLabel,
  isBiometricSupported,
} from "@/features/auth/utils/biometrics";
import { getPinCode } from "@/features/auth/utils/pinStore";

const SecuritySettings = () => {
  const [hasPin, setHasPin] = useState(false);
  const [biometricLabel, setBiometricLabelState] = useState<string | null>(
    null,
  );
  const [biometricEnabled, setBiometricEnabledState] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        const [pin, supported] = await Promise.all([
          getPinCode(),
          isBiometricSupported(),
        ]);

        setHasPin(!!pin);

        if (!pin || !supported) {
          setBiometricLabelState(null);
          return;
        }

        const [label, enabled] = await Promise.all([
          getBiometricLabel(),
          isBiometricEnabled(),
        ]);

        setBiometricLabelState(label);
        setBiometricEnabledState(enabled);
      };

      init();
    }, []),
  );

  const handleToggleBiometric = async (value: boolean) => {
    setBiometricEnabledState(value);
    await setBiometricEnabled(value);
  };

  return (
    <BaseAccordion title="Безопасность" icon="lock" value="security">
      <Pressable
        onPress={() => router.push("/(apps)/master/pin-manage")}
        className="w-full flex-row items-center justify-between"
      >
        <Text className="font-semibold">
          {hasPin ? "Изменить PIN-код" : "Установить PIN-код"}
        </Text>
      </Pressable>

      {biometricLabel && (
        <View className="w-full flex-row items-center justify-between">
          <Text className="font-semibold">Вход по {biometricLabel}</Text>
          <Switch
            value={biometricEnabled}
            onValueChange={handleToggleBiometric}
            trackColor={{ true: COLORS.primary }}
          />
        </View>
      )}
    </BaseAccordion>
  );
};

export default SecuritySettings;
