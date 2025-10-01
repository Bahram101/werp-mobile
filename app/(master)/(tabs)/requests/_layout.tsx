import { Stack } from "expo-router";

export default function RequestsLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerBackTitle: "",
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Заявки" }} />
      <Stack.Screen
        name="[id]"
        options={{
          headerStyle: {
            // backgroundColor: "#fff",
          },
        }}
      />
    </Stack>
  );
}
