import cn from "clsx";
import { useSegments } from "expo-router";
import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import Header from "./Header";

interface ILayout {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
}

const Layout: FC<ILayout> = ({ children, className, header = false }) => {
  const segments = useSegments() as string[];
  const isRequestsScreen = segments.includes("requests");

  return (
    <View className={cn("w-full h-full", className)}>
      {header && <Header />}

      <View
        className={cn("pt-2")}
        style={isRequestsScreen ? { paddingHorizontal: 0 } : undefined}
      >
        {children}
      </View>
    </View>
  );
};
export default Layout;
