import {
  SelectedSparePartItem,
  SparePartItem,
} from "@/features/master/requests/types";
import { useActionSheet } from "@/providers/ActionSheetProvider";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, Text, View } from "react-native";
import SparePartActionSheet from "../SparePartActionSheet";

type Props = {
  item: SparePartItem;
  isSelected: boolean;
  isLast?: boolean;
  selectedItems: SelectedSparePartItem[];
  onAddPart: (item: SparePartItem, qty: number) => void;
};

const SparePartModalListItem = ({
  item,
  isSelected,
  isLast,
  selectedItems,
  onAddPart,
}: Props) => {
  const { openSheet, closeSheet } = useActionSheet();

  const existing = selectedItems?.find((p) => p.id === item.id);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    openSheet(
      <SparePartActionSheet
        item={item}
        initialQty={existing?.selectedQty}
        onAdd={(qty: any) => onAddPart(item, qty)}
        closeSheet={closeSheet}
      />,
    );
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        className={cn(
          "py-3 flex-row items-center justify-between px-4",
          !isLast && "border-b border-grayLight",
          isSelected && "bg-green-100",
        )}
      >
        <View className="flex-1">
          <Text
            className="text-base text-gray-900 font-medium"
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text className="text-xs text-gray-400 mt-1">
            Арт: {item.serialNumber}
          </Text>
        </View>

        <View className="items-end gap-1">
          <Text className="text-sm font-semibold text-gray-800">
            {item.quantity} шт
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SparePartModalListItem;
