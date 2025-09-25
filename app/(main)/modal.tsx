import { Link, router, Stack } from "expo-router";

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <Stack screenOptions={{ headerShown: false }} >
      {isPresented && <Link href="../">Dismiss modal</Link>}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="service"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="finance"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="marketing"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
