import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export type AppBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  title?: string;
  children?: React.ReactNode;
  snapPoints?: string[];
};

const AppBottomSheet = forwardRef<AppBottomSheetRef, Props>(
  ({ title, snapPoints = ["75%"], children }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.expand(),
      close: () => bottomSheetRef.current?.close(),
    }));

    const CustomBackdrop = ({
      animatedIndex,
      style,
    }: BottomSheetBackdropProps) => {
      const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(animatedIndex.value, [-1, 0], [0, 1]);

        return { opacity };
      });

      return (
        <Animated.View
          pointerEvents="none"
          style={[
            style,
            animatedStyle,
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          ]}
        >
          <BlurView
            tint="dark"
            intensity={35}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          />
        </Animated.View>
      );
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
      >
        <BottomSheetView className="p-4">
          {title && (
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-semibold">{title}</Text>
              <Pressable onPress={() => bottomSheetRef.current?.close()}>
                <X />
              </Pressable>
            </View>
          )}
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

AppBottomSheet.displayName = "AppBottomSheet";

export default AppBottomSheet;
