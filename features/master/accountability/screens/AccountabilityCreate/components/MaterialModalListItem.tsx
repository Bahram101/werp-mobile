import SparePartActionSheet from "@/components/ui/actionsheet/SparePartActionSheet";
import { useActionSheet } from "@/providers/ActionSheetProvider";
import { strToLowerCase } from "@/utils/helpers";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialDto } from "../../../types";

type Props = {
  item: MaterialDto;
  selectedItems?: MaterialDto[];
  isSelected: boolean;
  isLast?: boolean;
  onAddMaterial: (item: MaterialDto, qty: number) => void;
};

const MaterialModalListItem = ({
  item,
  selectedItems,
  isSelected,
  isLast,
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
        initialQty={existing?.quantity}
        closeSheet={closeSheet}
      />,
    );
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        className={cn(
          "py-3 px-4 flex-row items-center",
          !isLast && "border-b border-grayLight",
          isSelected && "bg-green-100",
        )}
      >
        <View className="flex-1 pr-3 gap-1">
          <Text className="" numberOfLines={2}>
            {strToLowerCase(item.matnrName.trim())}
          </Text>
          <Text className="text-grayDark ">{item.code}</Text>
        </View>

        <View className="w-16 shrink-0 flex-row justify-end gap-1">
          <Text className="font-medium">{item.availableQty} шт.</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MaterialModalListItem;
