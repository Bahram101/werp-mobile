import { Stack } from "expo-router";

export default function RequestsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        // headerBackTitle: "Назад", 
      }}
    >
      <Stack.Screen name="index" options={{ title: "Заявки" }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Детали заявки",
          // headerBackTitle: "Назад",
        }}
      />
    </Stack>
  );
}
