// import { tabItems } from "@/components/navigation/tab-items";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AuthService } from "@/features/auth/services/auth.service";
import { tabItems } from "@/features/service/navigation/tab-items";
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
      {tabItems.map((tab) => {
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              headerShown:
                tab.name === "messages" || tab.name === "requests"
                  ? false
                  : true,
              title: tab.title,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name={tab.icon as any}
                  size={size}
                  color={color}
                />
              ),
              ...(tab.name === "profile" && {
                headerRight() {
                  return (
                    <MaterialCommunityIcons
                      name="logout"
                      onPress={logout}
                      size={22}
                    />
                  );
                },
              }),
            }}
          />
        );
      })}
    </Tabs>
  );
}
