import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function HistoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={({ navigation }) => ({
          title: "Историяя",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginLeft: -8 }}
            >
              <Feather name="chevron-left" size={30} color="#000" />
            </Pressable>
          ),
        })}
      />
    </Stack>
  );
}
