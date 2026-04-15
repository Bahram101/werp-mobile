import React, { FC, ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

interface ILayout {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const Layout: FC<ILayout> = ({
  children,
  className,
  header = false,
  refreshing,
  onRefresh,
}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 10,
      }}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    >
      <View className={className}>{children}</View>
    </ScrollView>
  );
};
export default Layout;
