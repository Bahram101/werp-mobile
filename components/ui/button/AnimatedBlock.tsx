import { IRequest } from "@/features/master/requests/types";
import cn from "clsx";

import { ReactNode, useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";

type AnimatedBlockProps = {
  children: ReactNode;
  item?: IRequest;
  bg?: string;
  onPress?: () => void
};

export default function AnimatedBlock({
  children,
  item,
  bg,
  onPress
}: AnimatedBlockProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      <Animated.View
        style={{ transform: [{ scale }] }}
        className={cn("mb-3 rounded-2xl p-3 w-full", bg ? 'bg-primary' : 'bg-white')}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}
