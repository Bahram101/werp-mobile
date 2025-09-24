// app/(main)/modals/marketing/_layout.tsx
import { Tabs } from "expo-router";

export default function MarketingTabsLayout() {
  return (
    <Tabs initialRouteName="sales" screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="sales"     options={{ title: "Продажа" }} />
      <Tabs.Screen name="bonuses"   options={{ title: "Бонусы" }} />
      <Tabs.Screen name="contracts" options={{ title: "Договоры" }} />
    </Tabs>
  );
}
