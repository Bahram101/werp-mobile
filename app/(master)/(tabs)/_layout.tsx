import { useAuth } from "@/features/auth/hooks/useAuth";
import { tabItems } from "@/features/navigation/master-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const { logout } = useAuth();

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
              // tabBarStyle: {
              //   // backgroundColor: "#111827",
              //   borderTopColor: "transparent",
              //   elevation: 0,
              //   borderRadius: 25,
              // },
              headerShown: ["home", "requests", "messages"].includes(tab.name)
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
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        className="mr-3"
                        name="logout"
                        onPress={logout}
                        size={22}
                      />
                    </TouchableOpacity>
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
