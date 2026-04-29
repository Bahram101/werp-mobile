import { ServiceItem } from "@/features/master/requests/types";
import React from "react";
import ServiceModalListItem from "./ServiceModalListItem";

type Props = {
  data: ServiceItem[];
  selectedIds: string[];
  selectedItems: any[];
  handleAddPart: () => void;
};

const ServiceModalList = ({
  data,
  selectedIds = [],
  selectedItems,
  handleAddPart,
}: Props) => {
  return data.map((item, index) => (
    <ServiceModalListItem
      key={item.id}
      item={item}
      isSelected={selectedIds?.includes(String(item.id))}
      isLast={index === data.length - 1}
      selectedItems={selectedItems}
      onAddPart={handleAddPart}
    />
  ));
};

export default ServiceModalList;
