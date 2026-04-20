import React from "react";
import { MaterialDto, SelectedMaterialItem } from "../../../types";
import MaterialModalListItem from "./MaterialModalListItem";

type Props = {
  data: MaterialDto[];
  selectedIds: string[];
  selectedItems: SelectedMaterialItem[];
  handleAddMaterial: (item: MaterialDto, qty: number) => void;
};

const MaterialModalList = ({
  data,
  selectedIds = [],
  selectedItems,
  handleAddMaterial,
}: Props) => {
  return (
    <>
      {data?.map((item, index) => (
        <MaterialModalListItem
          key={item.matnr}
          item={item}
          isSelected={selectedIds?.includes(String(item.matnr))}
          isLast={index === data.length - 1}
          selectedItems={selectedItems}
          onAddMaterial={handleAddMaterial}
        />
      ))}
    </>
  );
};

export default MaterialModalList;
