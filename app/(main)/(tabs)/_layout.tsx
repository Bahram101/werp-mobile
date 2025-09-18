// import { tabItems } from "@/components/navigation/tab-items";
import { tabItems } from "@/components/navigation/tab-items";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {

  return (
    <Tabs>
      {tabItems.map((tab) => (
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
      ))}
    </Tabs>
  );
}
