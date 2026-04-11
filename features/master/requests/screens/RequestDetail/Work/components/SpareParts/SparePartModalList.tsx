import { MatnrItem, SelectedMatnrItem } from "@/features/master/requests/types";
import React from "react";
import SparePartModalListItem from "./SparePartModalListItem";

type Props = {
  data: MatnrItem[];
  selectedIds: string[];
  selectedItems: SelectedMatnrItem[];
  handleAddPart: (item: MatnrItem, qty: number) => void;
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
          key={item.index}
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
