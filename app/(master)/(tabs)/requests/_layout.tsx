import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Pressable } from "react-native";

export default function RequestsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Заявки" }} />
      <Stack.Screen
        name="[id]"
        options={({ navigation }) => ({
          title: "Детали заявки",
          headerBackVisible: false,
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
