import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

import BaseAccordion from "@/components/ui/accordion/BaseAccordion";

const SecuritySettings = () => {
  return (
    <BaseAccordion title="Безопасность" icon="lock" value="security">
      <Pressable
        onPress={() => router.push("/(apps)/master/pin-change")}
        className="w-full flex-row items-center justify-between"
      >
        <Text className="font-semibold">Изменить PIN-код</Text>
        {/* <ChevronRight size={20} color="#A3A3A3" className="" /> */}
      </Pressable>
    </BaseAccordion>
  );
};

export default SecuritySettings;
