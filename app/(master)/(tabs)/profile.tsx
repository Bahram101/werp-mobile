import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-orange-200">
      <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
        <BottomSheetView >
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export default App;
