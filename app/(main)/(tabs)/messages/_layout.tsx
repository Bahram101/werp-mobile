import { Stack } from "expo-router";

export default function MessagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleAlign: "center" }}>
      <Stack.Screen
        name="index"
        options={{ title: "Сообщения", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="[id]" options={{ title: "Детали сообщения" }} />
    </Stack>
  );
}
