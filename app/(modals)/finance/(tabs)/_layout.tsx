import { serviceTabs } from "@/features/navigation/service-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ServiceTabsLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      {serviceTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name={tab.icon as any} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
