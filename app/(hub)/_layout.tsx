import { Stack } from "expo-router";

export default function HubLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Отделы" }} />
    </Stack>
  );
}
