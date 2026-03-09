import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const NoAccess = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl text-center">
        У вас нет доступа к мобильному приложению
      </Text>
      <Button className="mt-5" onPress={() => router.replace("/(auth)/login")}>
        <ButtonText className="text-black text border rounded-lg px-3 py-1">
          Назад
        </ButtonText>
      </Button>
    </View>
  );
};

export default NoAccess;
