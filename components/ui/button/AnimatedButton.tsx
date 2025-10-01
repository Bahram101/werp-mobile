import { COLORS } from "@/constants/theme";
import cn from "clsx";
import { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";

type AnimatedButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  size?: "full" | "half";
  bg?: keyof typeof COLORS;  
  bgPressed?: keyof typeof COLORS;
};

export default function AnimatedButton({
  children,
  onPress,
  bg = "primary",
  bgPressed = 'primaryDark',
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
          }}
          className={cn("rounded-2xl p-4")}
        >
          <Text className="text-white text-lg font-bold text-center">
            {children}
          </Text>
        </Animated.View>
      )}
    </Pressable>
  );
}
