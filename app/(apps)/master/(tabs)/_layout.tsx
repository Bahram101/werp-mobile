import { Tabs } from "expo-router";

export default function MasterTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Главная" }} />
      <Tabs.Screen name="requests" options={{ title: "Заявки" }} />
      <Tabs.Screen name="equipment" options={{ title: "Инвентарь" }} />
      <Tabs.Screen name="messages" options={{ title: "Сообщения" }} />
    </Tabs>
  );
}
