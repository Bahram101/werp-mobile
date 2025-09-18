// import { tabItems } from "@/components/navigation/tab-items";
import { tabItems } from "@/components/navigation/tab-items";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  console.log("");
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      {tabItems.map((tab) => {
        console.log("tab item", tab);
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              headerShown: tab.name === "messages" ? false : true,
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
