// app/(main)/modals/service/_layout.tsx
import CloseButton from "@/components/ui/button/CloseButton";
import { Tabs } from "expo-router";

export default function ServiceTabsLayout() {
  return (
    <Tabs
      initialRouteName="tasks"
      screenOptions={{
        headerShown: true,
        headerRight: () => <CloseButton />,       
        tabBarActiveTintColor: "orange",
        // tabBarInactiveTintColor: "rgba(255,255,255,0.7)",
        // sceneContainerStyle: { backgroundColor: "#0b1220" },
      }}
    >
      <Tabs.Screen name="tasks" options={{ title: "Задачи" }} />
      <Tabs.Screen name="messages" options={{ title: "Сообщения" }} />
      <Tabs.Screen name="news" options={{ title: "Новости" }} />
    </Tabs>
  );
}
