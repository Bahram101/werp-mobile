import { mainTabs } from "@/features/navigation/main-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      {mainTabs.map((tab) => {
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarStyle: {
                // backgroundColor: "#111827",
                borderTopColor: "transparent",
                elevation: 0,
                borderRadius: 25,
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name={tab.icon as any}
                  size={size}
                  color={color}
                />
              ),
              headerShown: tab.name === "main" && false,
            }}
          />
        );
      })}
    </Tabs>
  );
}
