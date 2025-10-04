import { ColorKeys, COLORS } from "@/constants/theme";
import { TypeFeatherIconNames } from "@/types/types";
import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";

type AnimatedButtonProps = {
  className?: string;
  children: React.ReactNode;
  onPress?: () => void;
  size?: "full" | "half";
  bg?: ColorKeys;
  bgPressed?: ColorKeys;
  iconColor?: ColorKeys;
  textColor?: ColorKeys;
  icon?: TypeFeatherIconNames;
};

export default function AnimatedButton({
  className,
  children,
  onPress,
  bg = "primary",
  bgPressed = "primaryDark",
  iconColor = "white",
  textColor = "white",
  icon,
}: AnimatedButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressed = useRef(false);

  const onPressIn = () => {
    pressed.current = true;
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const onPressOut = () => {
    pressed.current = false;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      className={cn("flex-1")}
    >
      {({ pressed }) => (
        <Animated.View
          style={{
            transform: [{ scale }],
            backgroundColor: pressed ? COLORS[bgPressed] : COLORS[bg],
            // minHeight: 60,
          }}
          className={cn(
            "rounded-2xl p-4 flex-row gap-3 justify-center items-center",
            className
          )}
        >
          <>
            {icon && (
              <Feather name={icon} size={33} color={COLORS[iconColor]} />
            )}
            <Text className={`text-lg font-semibold text-center text-${textColor}`}>
              {children}
            </Text>
          </>
        </Animated.View>
      )}
    </Pressable>
  );
}
