import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* регистрируем вкладки */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* регистрируем стек сообщений */}
      <Stack.Screen name="messages/[id]" options={{ title: "Сообщение" }} />
    </Stack>
  );
}
