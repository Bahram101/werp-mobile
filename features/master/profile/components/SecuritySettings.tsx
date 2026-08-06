import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import { getPinCode } from "@/features/auth/utils/pinStore";

const SecuritySettings = () => {
  const [hasPin, setHasPin] = useState(false);

  useEffect(() => {
    getPinCode().then((pin) => setHasPin(!!pin));
  }, []);

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
    </BaseAccordion>
  );
};

export default SecuritySettings;
