import React from "react";
import { MaterialDto } from "../../../types";
import MaterialModalListItem from "./MaterialModalListItem";

type Props = {
  items: any[];
  selectedIds: string[];
  selectedItems: MaterialDto[];
  handleAddMaterial: (item: MaterialDto, qty: number) => void;
};

const MaterialModalList = ({
  items,
  selectedIds = [],
  selectedItems,
  handleAddMaterial,
}: Props) => {
  return (
    <>
      {items?.map((item, index) => (
        <MaterialModalListItem
          key={item.matnr}
          item={item}
          isSelected={selectedIds?.includes(String(item.matnr))}
          isLast={index === items.length - 1}
          selectedItems={selectedItems}
          onAddMaterial={handleAddMaterial}
        />
      ))}
    </>
  );
};

export default MaterialModalList;
