import cn from "clsx";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";

import { PinDots } from "@/features/auth/components/PinDots";
import { PinKeypad } from "@/features/auth/components/PinKeypad";

interface PinScreenLayoutProps {
  title: string;
  subtitle: string;
  hasError?: boolean;
  pinLength: number;
  filled: number;
  onPressDigit: (digit: string) => void;
  onBackspace: () => void;
  footer?: ReactNode;
}

export const PinScreenLayout: React.FC<PinScreenLayoutProps> = ({
  title,
  subtitle,
  hasError,
  pinLength,
  filled,
  onPressDigit,
  onBackspace,
  footer,
}) => {
  return (
    <View className="flex-1 bg-white px-16 py-10">
      <View className="flex-1 items-center justify-center">
        <View className="mt-10 w-full items-center gap-3">
          <Text className="text-center text-2xl font-medium">{title}</Text>
          <Text
            className={cn(
              "text-center text-sm",
              hasError ? "text-red" : "text-grayDark",
            )}
          >
            {subtitle}
          </Text>

          <View className="my-6">
            <PinDots length={pinLength} filled={filled} hasError={hasError} />
          </View>
        </View>

        <View className="w-full items-center">
          <PinKeypad
            onPressDigit={onPressDigit}
            onBackspace={onBackspace}
            disabled={hasError}
          />

          {footer}
        </View>
      </View>
    </View>
  );
};
