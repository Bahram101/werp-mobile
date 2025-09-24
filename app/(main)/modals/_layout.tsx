import { Stack } from "expo-router";
import { Platform } from "react-native";

// export default function MainLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="modal"
//         options={{
//           presentation: "transparentModal", // fullScreenModal, modal, transparentModal
//           animation: Platform.OS === "ios" ? "slide_from_bottom" : "fade", //fade, slide_from_right
//           headerShown: false,
//         }}
//       />
//     </Stack>
//   );
// }

export default function MainModalsLayout() {
  const modalOpts = {
    presentation: "modal" as const, // или "transparentModal"/"fullScreenModal"
    animation: Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
    headerShown: false,
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="service"
        options={{
          presentation: "modal" as const,
          animation:
            Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="finance"
        options={{
          presentation: "modal" as const,
          animation:
            Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="marketing"
        options={{
          presentation: "modal" as const,
          animation:
            Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
