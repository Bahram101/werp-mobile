import React from "react";
import { Text } from "react-native";
import { TabBar, TabBarItem, TabBarProps } from "react-native-tab-view";

export default function RequestsTabBar(props: TabBarProps<any>) {
  return (
    <TabBar
      {...props}
      activeColor="black"
      inactiveColor="black"
      style={{
        backgroundColor: "#D4D4D4",
        height: 43,
        borderRadius: 40,
        marginBottom: 4,
      }}
      contentContainerStyle={{
        backgroundColor: "transparent",
        borderRadius: 30,
        alignItems: "center",
      }}
      indicatorStyle={{
        backgroundColor: "white",
        height: "88%",
        width: "32%",
        borderRadius: 9999,
        marginVertical: 2,
        marginLeft: 3,
      }}
      tabStyle={{
        flex: 1,
        // width: 'auto',
      }}
      renderTabBarItem={(itemProps) => {
        const { key, ...rest } = itemProps;
        return (
          <TabBarItem
            key={itemProps.key}
            {...rest}
            label={({ labelText }) => (
              <Text
                style={{
                  fontSize: 14,
                  padding: 0,
                }}
              >
                {labelText}
              </Text>
            )}
          />
        );
      }}
    />
  );
}
