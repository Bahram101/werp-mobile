import { Stack } from "expo-router";

export default function ServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="magnum"
        options={{
          // presentation: "fullScreenModal",
          headerShown: false,
          animation: "slide_from_left",
        }}
      /> */}
    </Stack>
  );
}
