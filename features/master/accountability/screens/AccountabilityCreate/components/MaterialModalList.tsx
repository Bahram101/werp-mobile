import React from "react";
import { MaterialDto } from "../../../types";
import MaterialModalListItem from "./MaterialModalListItem";

type Props = {
  items: any[];
  selectedIds: string[];
  selectedItems: MaterialDto[];
  search: string;
  handleAddMaterial: (item: MaterialDto, qty: number) => void;
};

const MaterialModalList = ({
  items,
  selectedIds = [],
  selectedItems,
  search,
  handleAddMaterial,
}: Props) => {
  const filteredItems = items.filter(
    (item) =>
      item.matnrName.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()),
  );

  return filteredItems?.map((item, index) => (
    <MaterialModalListItem
      key={item.matnr}
      item={item}
      isSelected={selectedIds?.includes(String(item.matnr))}
      isLast={index === items.length - 1}
      selectedItems={selectedItems}
      onAddMaterial={handleAddMaterial}
    />
  ));
};

export default MaterialModalList;
