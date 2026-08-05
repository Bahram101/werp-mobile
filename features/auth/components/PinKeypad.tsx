import { Delete } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "backspace"];

interface PinKeypadProps {
  onPressDigit: (digit: string) => void;
  onBackspace: () => void;
  disabled?: boolean;
}

export const PinKeypad: React.FC<PinKeypadProps> = ({
  onPressDigit,
  onBackspace,
  disabled,
}) => {
  return (
    <View className="w-full flex-row flex-wrap justify-between">
      {KEYS.map((key, index) => {
        if (!key) {
          return <View key={index} className="h-16 w-16 my-2" />;
        }

        if (key === "backspace") {
          return (
            <Pressable
              key={index}
              disabled={disabled}
              onPress={onBackspace}
              className="h-16 w-16 my-2 items-center justify-center rounded-full active:bg-grayLight"
            >
              <Delete size={24} color="#181718" />
            </Pressable>
          );
        }

        return (
          <Pressable
            key={index}
            disabled={disabled}
            onPress={() => onPressDigit(key)}
            className="h-16 w-16 my-2 items-center justify-center rounded-full active:bg-grayLight"
          >
            <Text className="text-2xl font-medium">{key}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};
