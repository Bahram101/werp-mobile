// app/(main)/modals/service/_layout.tsx
import { Tabs } from "expo-router";

export default function ServiceTabsLayout() {
  return (
    <Tabs initialRouteName="tasks" screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="tasks"    options={{ title: "Задачи" }} />
      <Tabs.Screen name="messages" options={{ title: "Сообщения" }} />
      <Tabs.Screen name="news"     options={{ title: "Новости" }} />
    </Tabs>
  );
}
