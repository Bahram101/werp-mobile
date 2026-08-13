import cn from "clsx";
import React, { ComponentType, FC, PropsWithChildren } from "react";
import { Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

interface SectionCardProps {
  title: string;
  icon: ComponentType<{ size?: number; color?: string }>;
  className?: string;
}

const SectionCard: FC<PropsWithChildren<SectionCardProps>> = ({
  title,
  icon: Icon,
  className,
  children,
}) => {
  return (
    <View className={cn("mt-3 rounded-2xl bg-white p-3 px-4", className)}>
      <View className="mb-4 flex-row items-center border-b border-grayLight py-3 pt-2">
        <Icon size={22} color={COLORS.primary} />
        <Text className="ml-4 font-bold uppercase text-primary">{title}</Text>
      </View>

      {children}
    </View>
  );
};

export default SectionCard;
