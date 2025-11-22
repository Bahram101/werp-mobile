import { CheckboxGroup } from "@/components/ui/checkbox";
import { ServiceItem } from "@/features/master/requests/types";
import React from "react";
import ServiceModalListItem from "./ServiceModalListItem";

type Props = {
  data: ServiceItem[];
  onSelect: (values: string[]) => void;
  selectedIds: string[];
};

const ServiceModalList = ({ data, onSelect, selectedIds }: Props) => {
  const handleChange = (values: string[]) => {
    console.log("values", values);
    onSelect(values);
  };

  return (
    <CheckboxGroup value={selectedIds} onChange={handleChange}>
      {data.map((item) => (
        <ServiceModalListItem
          key={item.id}
          value={String(item.id)}
          label={item.name}
        />
      ))}
    </CheckboxGroup>
  );
};

export default ServiceModalList;
