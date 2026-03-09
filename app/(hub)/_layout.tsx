import { Stack } from "expo-router";

export default function HubLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        // options={{ title: "Отделы", headerShown: false }}
      />
    </Stack>
  );
}
