import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import cn from "clsx";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("backdrop pressed (TouchableWithoutFeedback)");
              bottomSheetRef.current?.close();
            }}
          >
            <View style={{ flex: 1 }}>
              <BlurView
                tint="dark"
                intensity={35}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.2)",
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      );
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
        enablePanDownToClose={true}
        handleStyle={{ display: "none" }}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="">
          {title && (
            <View
              className={cn(
                "flex-row justify-between items-center mb-3 p-4",
                // snapPoints[0] === "80%" && "mt-12",
              )}
            >
              <Text className="text-lg font-semibold">{title}</Text>
              <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                <X />
              </TouchableOpacity>
            </View>
          )}
          <BottomSheetScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className=" ">{children}</View>
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

AppBottomSheet.displayName = "AppBottomSheet";

export default AppBottomSheet;
