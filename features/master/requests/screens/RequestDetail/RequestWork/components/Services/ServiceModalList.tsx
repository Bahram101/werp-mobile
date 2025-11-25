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
  handleSelectServices,
  selectedServiceIds,
}: Props) => {
  const handleChange = (values: string[]) => {
    handleSelectServices(values); 
  };

  return (
    <CheckboxGroup value={selectedServiceIds} onChange={handleChange}>
      {data.map((item, index) => (
        <ServiceModalListItem
          key={item.id}
          isLast={index === data.length - 1}
          value={String(item.id)}
          label={item.name}
        />
      ))}
    </CheckboxGroup>
  );
};

export default ServiceModalList;
