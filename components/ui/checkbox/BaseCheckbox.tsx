import { COLORS } from "@/constants/theme";
import { Check } from "lucide-react-native";
import React from "react";
import { Checkbox, CheckboxIcon, CheckboxIndicator } from "./index";

type Props = {
  value: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

const BaseCheckbox = ({ value, checked, onChange }: Props) => {
  return (
    <Checkbox value={value} isChecked={checked} onChange={onChange}>
      <CheckboxIndicator>
        <CheckboxIcon as={Check} color={COLORS.primary} size="md" />
      </CheckboxIndicator>
    </Checkbox>
  );
};

export default BaseCheckbox;
