import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="modal"
        options={{
          presentation: "transparentModal", // fullScreenModal, modal, transparentModal 
          animation: Platform.OS === "ios" ? "slide_from_bottom" : "fade", //fade, slide_from_right 
          headerShown: false,
        }}
      />
    </Stack>
  );
}
