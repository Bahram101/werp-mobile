import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetSectionHeaderText,
  ActionsheetSectionList,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import React from "react";
import { Text, View } from "react-native";

const Profile = () => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);
  const DATA = [
    {
      title: "Gender",
      data: ["Men", "Women", "Boy", "Girl"],
    },
  ];
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg mb-4">Пример BottomSheet</Text>
      {/* <Pressable onPress={() => router.push("/magnum")}>
        <Text>Button</Text>
      </Pressable> */}
      <Button onPress={() => setShowActionsheet(true)}>
        <ButtonText className="text-black">Open</ButtonText>
      </Button>
      <Actionsheet
        isOpen={showActionsheet}
        onClose={handleClose}
        // snapPoints={[35]}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetSectionList
            sections={DATA}
            keyExtractor={(item: any, index) => item + index}
            renderItem={({ item }: any) => (
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>{item}</ActionsheetItemText>
              </ActionsheetItem>
            )}
            renderSectionHeader={({ section: { title, data } }) => (
              <ActionsheetSectionHeaderText>
                {title} ({data.length})
              </ActionsheetSectionHeaderText>
            )}
          />
        </ActionsheetContent>
      </Actionsheet>
    </View>
  );
};

export default Profile;
