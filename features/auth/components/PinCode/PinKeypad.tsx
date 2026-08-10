import { Delete } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface PinKeypadProps {
  onPressDigit: (digit: string) => void;
  onBackspace: () => void;
  disabled?: boolean;
}

const ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "backspace"],
];

export const PinKeypad: React.FC<PinKeypadProps> = ({
  onPressDigit,
  onBackspace,
  disabled,
}) => {
  return (
    <View className="w-full gap-3">
      {ROWS.map((row, rowIndex) => (
        <View key={rowIndex} className="w-full flex-row justify-between">
          {row.map((key, keyIndex) => {
            if (!key) {
              return <View key={keyIndex} className="h-20 w-20" />;
            }

            if (key === "backspace") {
              return (
                <Pressable
                  key={keyIndex}
                  disabled={disabled}
                  onPress={onBackspace}
                  className="h-20 w-20 items-center justify-center"
                >
                  <Delete size={28} color="#181718" />
                </Pressable>
              );
            }

            return (
              <Pressable
                key={keyIndex}
                disabled={disabled}
                onPress={() => onPressDigit(key)}
                className="h-20 w-20 items-center justify-center rounded-full bg-grayLight active:bg-grayMedium"
              >
                <Text className="text-3xl font-semibold">{key}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};
