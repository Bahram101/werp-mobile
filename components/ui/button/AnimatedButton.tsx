import { ColorKeys, COLORS } from "@/constants/theme";
import { TypeFeatherIconNames } from "@/types/types";
import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";
import { Loader } from "../Loader";

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
  isLoading?: boolean;
  disabled?: boolean;
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
  isLoading,
  disabled,
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
      className="w-full"
      disabled={isLoading || disabled}
    >
      {({ pressed }) => (
        <Animated.View
          style={{
            transform: [{ scale }],
            backgroundColor: pressed ? COLORS[bgPressed] : COLORS[bg],
            opacity: disabled ? 0.5 : 1,
          }}
          className={cn(
            "rounded-2xl flex-row gap-3 justify-center items-center min-h-[48px]",
            className,
          )}
        >
          {isLoading ? (
            <Loader color="text-white" />
          ) : (
            <>
              {icon && (
                <Feather name={icon} size={33} color={COLORS[iconColor]} />
              )}
              <Text
                className="text-lg font-semibold text-center"
                style={{ color: COLORS[textColor] }}
              >
                {children}
              </Text>
            </>
          )}
        </Animated.View>
      )}
    </Pressable>
  );
}
