import { router, useFocusEffect } from "expo-router";
import { ChevronRight, Lock } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

import SectionCard from "@/components/common/card/SectionCard";
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
    <SectionCard title="Безопасность" icon={Lock}>
      <TouchableOpacity
        className="flex-row justify-between items-center pt-1 pb-4 -mr-1.5"
        onPress={() => router.push("/(apps)/master/pin-manage")}
      >
        <Text>{hasPin ? "Изменить PIN-код" : "Установить PIN-код"}</Text>
        <ChevronRight size={20} className="" />
      </TouchableOpacity>

      {biometricLabel && (
        <View className="flex-row items-center justify-between">
          <Text>Вход по {biometricLabel}</Text>
          <Switch
            className=""
            value={biometricEnabled}
            onValueChange={handleToggleBiometric}
            trackColor={{ true: COLORS.primary }}
          />
        </View>
      )}
    </SectionCard>
  );
};

export default SecuritySettings;
