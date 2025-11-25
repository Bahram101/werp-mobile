import { CheckboxGroup } from "@/components/ui/checkbox";
import { SparePartItem } from "@/features/master/requests/types";
import React from "react";
import SparePartModalListItem from "./SparePartModalListItem";

type Props = {
  data: SparePartItem[];
  handleSelectSpareParts: (values: string[]) => void;
  selectedSparePartIds: string[];
};

const SparePartModalList = ({
  data,
  handleSelectSpareParts,
  selectedSparePartIds,
}: Props) => {
  const handleChange = (values: string[]) => {
    handleSelectSpareParts(values);
  };

  return (
    <CheckboxGroup value={selectedSparePartIds} onChange={handleChange}>
      {data.map((item, index) => (
        <SparePartModalListItem
          key={item.id}
          isLast={index === data.length - 1}
          value={String(item.id)}
          label={item.name}
        />
      ))}
    </CheckboxGroup>
  );
};

export default SparePartModalList;
