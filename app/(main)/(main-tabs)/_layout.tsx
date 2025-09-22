// import { tabItems } from "@/components/navigation/tab-items";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AuthService } from "@/features/auth/services/auth.service";
import { mainTabs } from "@/features/navigation/main-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  const { setUser } = useAuth();
  const logout = () => {
    AuthService.logout().then(() => setUser(null));
  };

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      {mainTabs.map((tab) => {
        console.log('tabItem',tab)
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name={tab.icon as any}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
