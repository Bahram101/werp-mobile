import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function About() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
      <Text>Abou page</Text>
      <Pressable onPress={() => router.replace("/(main)/(tabs)")}>
        <Text className="mt-4 px-4 py-2 bg-blue-500 rounded">Home</Text>
      </Pressable>
    </View>
  );
}
