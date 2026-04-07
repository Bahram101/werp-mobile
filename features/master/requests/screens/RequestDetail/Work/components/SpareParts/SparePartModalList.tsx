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
  // console.log("selectedSparePartIds", selectedSparePartIds);
  // console.log("data", JSON.stringify(data, null, 2));
  return (
    <CheckboxGroup
      value={selectedSparePartIds}
      onChange={handleSelectSpareParts}
    >
      {data.map((item, index) => (
        <SparePartModalListItem
          key={item.id}
          isLast={index === data.length - 1}
          item={item}
          onAddPart={handleAddPart}
        />
      ))}
    </CheckboxGroup>
  );
};

export default SparePartModalList;
