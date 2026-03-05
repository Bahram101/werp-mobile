import { useAuth } from "@/features/auth/hooks/useAuth";
import { Stack } from "expo-router";

export default function ServiceLayout() {
  const { user } = useAuth();

  if (!user) return null;
  const userInfo = {
    ...user,
    rids: [594],
    // [52],
  };

  // const roles = user.rids || [];

  const isMaster = userInfo.rids.includes(594);
  const isServiceHead = userInfo.rids.includes(52);

  console.log("isMaster", isMaster);
  console.log("isServiceHead", isServiceHead);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={isMaster ? "(master-tabs)" : "(head-tabs)"}
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
