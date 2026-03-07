import { useAuth } from "@/features/auth/hooks/useAuth";
import { Redirect, Slot, useSegments } from "expo-router";

export default function ServiceLayout() {
  const { user } = useAuth();
  const segments = useSegments() as string[];

  if (!user) return null;
  const userInfo = {
    ...user,
    rids: [594], // мастер
    // rids: [52], // начальник
  };

  const isMaster = userInfo.rids.includes(594);
  const isServiceHead = userInfo.rids.includes(52);

  const inMaster = segments.includes("(master-tabs)");
  const inHead = segments.includes("(head-tabs)");

  console.log("isMaster", isMaster);
  console.log("isServiceHead", isServiceHead);

  if (isMaster && !inMaster) {
    return <Redirect href="/(modules)/service/(master-tabs)" />;
  }

  if (isServiceHead && !inHead) {
    return <Redirect href="/(modules)/service/(head-tabs)" />;
  }

  return <Slot />;
}
