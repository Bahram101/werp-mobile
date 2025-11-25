import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import BoldCheck from "@/components/ui/checkbox/BoldCheck";
import cn from "clsx";
import * as Haptics from "expo-haptics";
import React from "react";

type Props = {
  value: string;
  label: string;
  isLast?: boolean;
};

const SparePartModalListItem = ({ value, label, isLast }: Props) => {
  return (
    <Checkbox
      value={value}
      size="md"
      className={cn(
        "flex-row justify-between items-center py-3 border-grayLight",
        !isLast && "border-b"
      )}
      onChange={(isChecked: boolean) => {
        if (isChecked) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      }}
    >
      <CheckboxLabel className="text-base text-textDark">{label}</CheckboxLabel>
      <CheckboxIndicator
        className={cn(
          "w-6 h-6 border border-gray-300 rounded-md items-center justify-center mr-[2px]"
        )}
      >
        <CheckboxIcon as={BoldCheck} className={cn("text-green-600")} />
      </CheckboxIndicator>
    </Checkbox>
  );
};

export default SparePartModalListItem;
