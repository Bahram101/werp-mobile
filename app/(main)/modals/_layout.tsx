import { Stack } from "expo-router";

export default function MainModalsLayout() {
  // const modalOpts = {
  //   presentation: "modal" as const, // или "transparentModal"/"fullScreenModal"
  //   animation: Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
  //   headerShown: false,
  // };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="service"
        options={{
          presentation: "transparentModal" as const,
          // animation:
          //   Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="finance"
        options={{
          presentation: "modal",
          animation: 'fade', 
          // animation:
          //   Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="marketing"
        options={{
          presentation: "modal",
          // animation:
          //   Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
