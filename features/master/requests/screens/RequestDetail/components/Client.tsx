import React, { FC } from "react";
import { Text } from "react-native";


import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import { ClientType } from "@/features/master/requests/types";

type ClientAccordionProps = {
  data: ClientType;
};

const Client: FC<ClientAccordionProps> = ({ data }) => (
  <BaseAccordion title="Данные клиента" icon="user" value="client">
    <Text>{data.name}</Text>
    <Text>{data.address}</Text>
    <Text>{data.problem}</Text>
  </BaseAccordion>
);
export default Client;
