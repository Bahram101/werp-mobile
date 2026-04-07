import { CheckboxGroup } from "@/components/ui/checkbox";
import { ServiceItem } from "@/features/master/requests/types";
import React from "react";
import ServiceModalListItem from "./ServiceModalListItem";

type Props = {
  data: ServiceItem[];
  handleSelectServices: (values: string[]) => void;
  selectedServiceIds: string[];
};

const ServiceModalList = ({
  data,
  selectedServiceIds,
  handleSelectServices,
}: Props) => {
  return (
    <CheckboxGroup value={selectedServiceIds} onChange={handleSelectServices}>
      {data.map((item, index) => (
        <ServiceModalListItem
          key={item.id}
          value={String(item.id)}
          label={item.name}
          isLast={index === data.length - 1}
        />
      ))}
    </CheckboxGroup>
  );
};

export default ServiceModalList;
