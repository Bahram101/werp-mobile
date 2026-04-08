import { CheckboxGroup } from "@/components/ui/checkbox";
import { SparePartItem } from "@/features/master/requests/types";
import React from "react";
import SparePartModalListItem from "./SparePartModalListItem";

type Props = {
  data: SparePartItem[];
  handleSelectSpareParts: (values: string[]) => void;
  selectedSparePartIds: string[];
  handleAddPart: (item: SparePartItem, qty: number) => void;
};

const SparePartModalList = ({
  data,
  handleSelectSpareParts,
  selectedSparePartIds,
  handleAddPart,
}: Props) => {
  return (
    <CheckboxGroup
      value={selectedSparePartIds}
      onChange={handleSelectSpareParts}
    >
      {data.map((item, index) => (
        <SparePartModalListItem
          key={item.id}
          item={item}
          onAddPart={handleAddPart}
          isLast={index === data.length - 1}
        />
      ))}
    </CheckboxGroup>
  );
};

export default SparePartModalList;
