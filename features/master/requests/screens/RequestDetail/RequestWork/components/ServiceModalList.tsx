import { ServiceItem } from "@/features/master/requests/types";
import React from "react";
import { View } from "react-native";
import ServiceModalListItem from "./ServiceModalListItem";
type Props = {
  data: ServiceItem[];
};

const ServiceModalList = ({ data }: Props) => {
  return (
    <View>
      {data.map((item, index) => (
        <ServiceModalListItem
          key={item.id}
          value={String(item.id)}
          label={item.name}
        />
      ))}
    </View>
  );
};

export default ServiceModalList;
