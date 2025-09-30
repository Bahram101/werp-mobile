// import { IRequest } from "@/features/master/requests/types";
// import cn from "clsx";
// import { router } from "expo-router";
// import { ReactNode, useRef } from "react";
// import { Animated, Pressable } from "react-native";

// type AnimatedBlockProps = {
//   children: ReactNode;
//   item?: IRequest;
//   bg?: string;
// };

// export default function AnimatedBlock({
//   children,
//   item,
//   bg,
// }: AnimatedBlockProps) {
//   const scale = useRef(new Animated.Value(1)).current;

//   const onPressIn = () => {
//     Animated.spring(scale, {
//       toValue: 0.97,
//       useNativeDriver: true,
//       speed: 50,
//       bounciness: 0,
//     }).start();
//   };

//   const onPressOut = () => {
//     Animated.spring(scale, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <Pressable
//       onPressIn={onPressIn}
//       onPressOut={onPressOut}
//       onPress={() => {
//         // if (!item) return;
//         router.push({
//           pathname: "/requests",
//           // params: { id: item.id, title: item.number },
//         });
//       }}
//     >
//       <Animated.View
//         style={{ transform: [{ scale }] }}
//         className={cn("mb-3 rounded-2xl p-3 w-full", bg ? 'bg-primary' : 'bg-white')}
//       >
//         {children}
//       </Animated.View>
//     </Pressable>
//   );
// }

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
  size = "full",
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
