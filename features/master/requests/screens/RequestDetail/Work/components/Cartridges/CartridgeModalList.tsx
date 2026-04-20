import React from "react";
import SparePartModalListItem from "./CartridgeModalListItem";

type Props = {
  data: any[];
  selectedIds: string[];
  selectedItems: any[];
  handleAddPart: (item: any, qty: number) => void;
};

const SparePartModalList = ({
  data,
  selectedIds = [],
  selectedItems,
  handleAddPart,
}: Props) => {
  return (
    <>
      {data.map((item, index) => (
        <SparePartModalListItem
          key={item.fno}
          item={item}
          isSelected={selectedIds?.includes(String(item.index))}
          isLast={index === data.length - 1}
          selectedItems={selectedItems}
          onAddPart={handleAddPart}
        />
      ))}
    </>
  );
};

export default SparePartModalList;
