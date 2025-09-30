import { useSegments } from "expo-router";
import React, { FC, ReactNode } from "react";
import { ScrollView } from "react-native";

interface ILayout {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
}

const Layout: FC<ILayout> = ({ children, className, header = false }) => {
  const segments = useSegments() as string[];
  // const isRequestsScreen = segments.includes("requests");

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 10,
      }}
    >
      {children}
    </ScrollView>
  );
};
export default Layout;
