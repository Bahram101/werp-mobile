import { Stack } from "expo-router";

export default function AccountabilityLayout() {
  return (
    <Stack
      screenOptions={{
        // headerShown: true,
        headerTitleAlign: "center",
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: "#000",
      }}
    >
      {/* список материалов */}
      <Stack.Screen
        name="index"
        options={{
          title: "Инвентарь",
          headerShown: true,
        }}
      />

      {/* детали документа */}
      <Stack.Screen
        name="[id]/index"
        options={{
          title: "Детальный документ",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
