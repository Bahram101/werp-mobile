import { MatnrItem, SelectedMatnrItem } from "@/features/master/requests/types";
import { useActionSheet } from "@/providers/ActionSheetProvider";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, Text, View } from "react-native";
import SparePartActionSheet from "../SparePartActionSheet";

type Props = {
  item: MatnrItem;
  isSelected: boolean;
  isLast?: boolean;
  selectedItems: SelectedMatnrItem[];
  onAddPart: (item: MatnrItem, qty: number) => void;
};

const SparePartModalListItem = ({
  item,
  isSelected,
  isLast,
  selectedItems,
  onAddPart,
}: Props) => {
  const { openSheet, closeSheet } = useActionSheet();

  const existing = selectedItems?.find((p) => p.index === item.index);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    openSheet(
      <SparePartActionSheet
        item={item}
        isSelected={isSelected}
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
            {item.matnrName}
          </Text>

          <Text className="text-xs text-gray-400 mt-1">
            Арт: {item.matnrCode}
          </Text>
        </View>

        <View className="items-end gap-1">
          <Text className="text-sm font-semibold text-gray-800">
            {/* {item.quantity} шт */}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SparePartModalListItem;
