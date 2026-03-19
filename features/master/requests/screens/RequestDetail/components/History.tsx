import React from "react";
import { Text, View } from "react-native";
import { HistoryItemType } from "../../../types";

type Props = {
  data: HistoryItemType[];
  value?: string;
};

export function History({ data }: Props) {
  return (
    <View>
      <Text className="">sdf</Text>
    </View>
  );
}
