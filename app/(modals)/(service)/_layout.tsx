import { Tabs } from "expo-router";

export default function ServiceLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Главная" }} />
      <Tabs.Screen name="tasks" options={{ title: "Задачи" }} />
    </Tabs>
  );
}
