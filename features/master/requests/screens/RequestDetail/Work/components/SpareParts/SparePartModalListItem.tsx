import { Checkbox, CheckboxLabel } from "@/components/ui/checkbox";
import { SparePartItem } from "@/features/master/requests/types";
import { useActionSheet } from "@/providers/ActionSheetProvider";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Text } from "react-native";
import SparePartActionSheet from "./SparePartActionSheet";

type Props = {
  isLast?: boolean;
  item: SparePartItem;
  onAddPart: (item: SparePartItem, qty: number) => void;
};

const SparePartModalListItem = ({ item, isLast, onAddPart }: Props) => {
  const [checked] = useState(false);
  const { openSheet, closeSheet } = useActionSheet();

  const handlePress = (isChecked: boolean) => {
    // console.log("isChecked", isChecked);

    if (isChecked) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      openSheet(
        <SparePartActionSheet
          item={item}
          closeSheet={closeSheet}
          onAdd={(qty) => onAddPart(item, qty)}
        />,
      );
    }
  };

  return (
    <Checkbox
      value={String(item?.id)}
      size="md"
      isChecked={checked}
      onChange={handlePress}
      className={cn(
        "flex-row justify-between items-center py-3 border-grayLight",
        !isLast && "border-b",
        checked && "bg-primaryLight",
      )}
    >
      <CheckboxLabel className="text-base text-textDark pl-1">
        {item?.name}
      </CheckboxLabel>

      <Text className="pr-1">{item.quantity} шт</Text>
      {/* <CheckboxIndicator className="w-6 h-6 border border-gray-300 rounded-md items-center justify-center mr-[2px] ">
        <CheckboxIcon as={BoldCheck} className="text-green-600" />
      </CheckboxIndicator> */}
    </Checkbox>
  );
};

export default SparePartModalListItem;
