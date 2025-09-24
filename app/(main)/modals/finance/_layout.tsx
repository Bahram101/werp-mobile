// app/(main)/modals/finance/_layout.tsx
import { Tabs } from "expo-router";

export default function FinanceTabsLayout() {
  return (
    <Tabs initialRouteName="reports" screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="reports"   options={{ title: "Отчеты" }} />
      <Tabs.Screen name="transfers" options={{ title: "Переводы" }} />
      <Tabs.Screen name="payments"  options={{ title: "Оплата" }} />
    </Tabs>
  );
}
