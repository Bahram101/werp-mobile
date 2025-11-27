import { useActionSheet } from "@/providers/ActionSheetProvider";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  value: string;
  label: string;
  isLast?: boolean;
};

const SparePartModalListItem = ({ value, label, isLast }: Props) => {
  const [checked, setChecked] = useState(false);
  const { openSheet } = useActionSheet();

  const showActionSheet = () => {
    setChecked(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    openSheet(
      <View className="gap-3 w-full">
        <Text className="text-xl font-semibold mb-2">{label}</Text>

        <Pressable className="p-3 bg-gray-100 rounded-lg">
          <Text>Добавить количество</Text>
        </Pressable>

        <Pressable className="p-3 bg-gray-100 rounded-lg">
          <Text>Посмотреть детали</Text>
        </Pressable>

        <Pressable className="p-3 bg-red-100 rounded-lg">
          <Text className="text-red-600">Удалить</Text>
        </Pressable>
      </View>
    );
  };

  console.log("checked", checked);
  return (
    <Pressable
      onPress={showActionSheet}
      className={cn(
        "py-3 px-3 border-grayLight",
        !isLast && "border-b",
        checked && "bg-primaryLight"
      )}
    >
      <Text className="text-base text-textDark">{label}</Text>
    </Pressable>
    // <Checkbox
    //   value={value}
    //   size="md"
    //   className={cn(
    //     "flex-row justify-between items-center py-3 border-grayLight",
    //     !isLast && "border-b",
    //     checked ? "bg-primaryLight" : ""
    //   )}
    //   onChange={(isChecked: boolean) => {
    //     setChecked(isChecked);
    //     showActionSheet()
    //     if (isChecked) {
    //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    //     }
    //   }}
    // >
    //   <CheckboxLabel className="text-base text-textDark ">
    //     {label}
    //   </CheckboxLabel>
    //   <CheckboxIndicator
    //     className={cn(
    //       "w-6 h-6 border border-gray-300 rounded-md items-center justify-center mr-[2px]"
    //     )}
    //   >
    //     <CheckboxIcon as={BoldCheck} className={cn("text-green-600")} />
    //   </CheckboxIndicator>
    // </Checkbox>
  );
};

export default SparePartModalListItem;
