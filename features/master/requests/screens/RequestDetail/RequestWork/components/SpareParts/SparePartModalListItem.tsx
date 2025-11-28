import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import BoldCheck from "@/components/ui/checkbox/BoldCheck";
import { SparePartItem } from "@/features/master/requests/types";
import { useActionSheet } from "@/providers/ActionSheetProvider";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import SparePartActionSheet from "./SparePartActionSheet";

type Props = {
  isLast?: boolean;
  item: SparePartItem;
};

const SparePartModalListItem = ({ item, isLast }: Props) => {
  const [checked, setChecked] = useState(false);
  const { openSheet, closeSheet } = useActionSheet();

  const handlePress = (isChecked: boolean) => {
    setChecked(isChecked);

    if (isChecked) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      openSheet(<SparePartActionSheet item={item} closeSheet={closeSheet}/>);
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
        checked && "bg-primaryLight"
      )}
    >
      <CheckboxLabel className="text-base text-textDark pl-1">
        {item?.name}
      </CheckboxLabel>

      <CheckboxIndicator className="w-6 h-6 border border-gray-300 rounded-md items-center justify-center mr-[2px] hidden">
        <CheckboxIcon as={BoldCheck} className="text-green-600" />
      </CheckboxIndicator>
    </Checkbox>
  );
};

export default SparePartModalListItem;
