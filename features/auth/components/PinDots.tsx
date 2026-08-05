import cn from "clsx";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

interface PinDotsProps {
  length: number;
  filled: number;
  hasError?: boolean;
}

export const PinDots: React.FC<PinDotsProps> = ({ length, filled, hasError }) => {
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!hasError) return;

    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [hasError, shake]);

  const translateX = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-8, 8],
  });

  return (
    <Animated.View
      className="flex-row items-center justify-center gap-4"
      style={{ transform: [{ translateX }] }}
    >
      {Array.from({ length }).map((_, index) => (
        <View
          key={index}
          className={cn(
            "h-4 w-4 rounded-full border",
            hasError
              ? "border-red bg-red"
              : index < filled
                ? "border-primary bg-primary"
                : "border-grayMedium bg-transparent",
          )}
        />
      ))}
    </Animated.View>
  );
};
