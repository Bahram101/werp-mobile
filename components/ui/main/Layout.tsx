import cn from "clsx";
import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import MainHeader from "./MainHeader";

interface ILayout {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
}

const Layout: FC<ILayout> = ({ children, className, header = false }) => {
  return (
    <View className={cn("flex-1 w-full h-full", className)}>
      {header && <MainHeader />}
      <View className="p-4">{children}</View>
    </View>
  );
};
export default Layout;
