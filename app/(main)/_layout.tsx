import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal", // fullScreenModal, modal, transparentModal 
          // animation: Platform.OS === "ios" ? "slide_from_bottom" : "fade", //fade, slide_from_right 
          animation: "slide_from_bottom",  
          headerShown: false,
        }}
      />
    </Stack>
  );
}