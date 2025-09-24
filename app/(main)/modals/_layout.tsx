import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen name="/(service)/" />
      <Stack.Screen
        name="modal"
        options={{
          // presentation: "modal",
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
