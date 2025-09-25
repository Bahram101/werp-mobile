import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function CloseButton() {
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={10}
      style={{ marginRight: 12 }}
      accessibilityRole="button"
      accessibilityLabel="Закрыть"
    >
      <Ionicons name="close" size={24} />
    </Pressable>
  );
}
