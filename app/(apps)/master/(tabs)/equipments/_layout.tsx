import { Stack } from "expo-router";

export default function EquipmentsLayout() {
  return (
    <Stack
      screenOptions={{
        // headerShown: true,
        headerTitleAlign: "center",
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Инвентарь",
          headerShown: true, // список заявок
        }}
      />

      {/* детальная инвентарь */}
      <Stack.Screen
        name="[appNumber]/history/[historyId]"
        options={{
          title: "Детальная история",
          headerShown: true,
        }}
      />

      {/* детальная документ */}
      <Stack.Screen
        name="[id]/index"
        options={{
          title: "Детальная история",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
