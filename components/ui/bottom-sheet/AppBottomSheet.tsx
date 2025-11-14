import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { Pressable, Text, View } from "react-native";

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
  ({ title, snapPoints = ["95%"], children }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false); 
    }, []);

    useImperativeHandle(ref, () => ({
      open: () => mounted && bottomSheetRef.current?.expand(),
      close: () => mounted && bottomSheetRef.current?.close(),
    }));

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetView className="p-4">
          {title && (
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-semibold">{title}</Text>
              <Pressable
                onPress={() => {
                  if (mounted) bottomSheetRef.current?.close();
                }}
              >
                <Text className="text-gray-500 text-xl">×</Text>
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
