import SparePartActionSheet from "@/components/ui/actionsheet/SparePartActionSheet";
import { useActionSheet } from "@/providers/ActionSheetProvider";
import { strToLowerCase } from "@/utils/helpers";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialDto, SelectedMaterialItem } from "../../../types";

type Props = {
  item: MaterialDto;
  isSelected: boolean;
  isLast?: boolean;
  selectedItems?: SelectedMaterialItem[];
  onAddMaterial: (item: MaterialDto, qty: number) => void;
};

const MaterialModalListItem = ({
  item,
  isSelected,
  isLast,
  selectedItems,
  onAddMaterial,
}: Props) => {
  const { openSheet, closeSheet } = useActionSheet();

  const existing = selectedItems?.find((p) => p.matnr === item.matnr);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    openSheet(
      <SparePartActionSheet
        item={item}
        isSelected={isSelected}
        onAdd={(qty) => onAddMaterial(item, qty)}
        initialQty={existing?.selectedQty}
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
        <View className="flex-row items-center gap-2">
          <View>
            <Text
              className="text-base text-gray-900 font-medium"
              numberOfLines={1}
            >
              {strToLowerCase(item.matnrName)}
            </Text>
            <Text className="text-xs text-gray-400 mt-1">Арт: {item.code}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MaterialModalListItem;
