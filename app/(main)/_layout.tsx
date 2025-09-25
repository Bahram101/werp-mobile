import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

const Back = () => (
  <Pressable onPress={() => router.back()} hitSlop={12} style={{ marginLeft: 12 }}>
    <Ionicons name="close" size={22} />
  </Pressable>
);

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "fullScreenModal",
          // animation: "slide_from_bottom",
          headerShown: true,             // показать хедер только у модалки
          headerTitle: "",
          headerRight: () => <Back />,    // ← кнопка закрытия
        }}
      />
    </Stack>
  );
}