import { SparePartItem } from "@/features/master/requests/types";
import React from "react";
import SparePartModalListItem from "./SparePartModalListItem";

type Props = {
  data: SparePartItem[];
  handleSelectSpareParts: (values: string[]) => void;
  selectedIds: string[];
  handleAddPart: (item: SparePartItem, qty: number) => void;
};

const SparePartModalList = ({
  data,
  selectedIds = [],
  handleAddPart,
}: Props) => {
  return (
    <>
      {data.map((item, index) => (
        <SparePartModalListItem
          key={item.id}
          item={item}
          onAddPart={handleAddPart}
          isSelected={selectedIds?.includes(String(item.id))}
          isLast={index === data.length - 1}
        />
      ))}
    </>
  );
};

export default SparePartModalList;
