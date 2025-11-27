import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Profile = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg mb-4">Пример BottomSheet</Text>
      <Pressable onPress={() => router.push("/magnum")}>
        <Text>Button</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
