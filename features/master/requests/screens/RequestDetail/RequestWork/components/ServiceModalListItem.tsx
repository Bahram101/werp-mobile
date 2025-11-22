import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Check } from "lucide-react-native";
import React from "react";

type Props = {
  value: string
  label: string;
};

const ServiceModalListItem = ({ value, label }: Props) => {
  return (
    <Checkbox
      value={value}
      size="md"
      className="flex-row justify-between items-center py-3 border-b border-grayLight"
    >
      <CheckboxLabel className="text-base text-textDark">{label}</CheckboxLabel>

      <CheckboxIndicator className="w-6 h-6 border border-gray-300 rounded-md items-center justify-center mr-[2px]">
        <CheckboxIcon as={Check} className="text-green-600"  />
      </CheckboxIndicator>
    </Checkbox>
  );
};

export default ServiceModalListItem;
