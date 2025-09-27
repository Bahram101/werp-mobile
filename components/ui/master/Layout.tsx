import cn from "clsx";
import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import Header from "./Header";

interface ILayout {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
}

const Layout: FC<ILayout> = ({ children, className, header = false }) => {
  return (
    <View className={cn("w-full h-full", className)}>
      {header && <Header />}

      <View className="px-4 pt-2">{children}</View>
    </View>
  );
};
export default Layout;
