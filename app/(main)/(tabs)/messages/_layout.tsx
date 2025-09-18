import { Stack } from "expo-router";

export default function MessagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="index" 
        options={{ title: "Сообщения" }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ title: "Детали сообщения" }} 
      />
    </Stack>
  );
}
