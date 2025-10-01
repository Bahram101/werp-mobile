import { COLORS } from "@/constants/theme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { tabItems } from "@/features/navigation/master-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const { logout } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: { color: "#000" },
        tabBarActiveTintColor: COLORS.primaryDark,
        tabBarInactiveTintColor: "#B0B2B5",
      }}
    >
      {tabItems.map((tab) => {
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              tabBarStyle: {
                // backgroundColor: "#111827",
                // borderTopColor: "transparent",
                elevation: 0,
                borderTopWidth: 1,
                borderTopColor: "#E5E7EB",
                // borderRadius: 25,
              },
              headerShown: ["home", "requests", "messages"].includes(tab.name)
                ? false
                : true,
              title: tab.title,
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    className={cn(
                      tab.icon === "message-text-outline" && "-mb-1"
                    )}
                    name={tab.icon}
                    size={
                      tab.icon === "folder-open-outline"
                        ? 27
                        : tab.icon === "file-document-edit-outline"
                        ? 23
                        : size
                    }
                    color={color}
                  />
                );
              },
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
