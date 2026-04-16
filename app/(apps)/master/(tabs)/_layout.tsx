import { COLORS } from "@/constants/theme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { tabItems } from "@/navigation/master/tabs";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const { logout } = useAuth();
  const { closeBottomSheet } = useBottomSheet();

  const logOut = () => {
    closeBottomSheet();
    logout();
  };

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: { color: "#000" },
        tabBarActiveTintColor: COLORS.primaryDark,
        tabBarInactiveTintColor: "#B0B2B5",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      {tabItems.map((tab) => {
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              tabBarStyle: {
                elevation: 0,
                borderTopWidth: 1,
                borderTopColor: "#E5E7EB",
                // backgroundColor: "#111827",
                // borderTopColor: "transparent",
                // borderRadius: 25,
              },
              // headerShown: [
              //   "home",
              //   "requests",
              //   "equipments",
              //   "messages",
              // ].includes(tab.name)
              //   ? false
              //   : true,
              headerShown: tab.name === "profile" ? true : false,
              title: tab.title,
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    className={cn(
                      tab.icon === "message-text-outline" && "-mb-1",
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
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...(props as any)}
                  onPress={(e) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    props.onPress?.(e);
                  }}
                  activeOpacity={0.8}
                />
              ),
              ...(tab.name === "profile" && {
                headerRight() {
                  return (
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        className="mr-3"
                        name="logout"
                        onPress={logOut}
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
