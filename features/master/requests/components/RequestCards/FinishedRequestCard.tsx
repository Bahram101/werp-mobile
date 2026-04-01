import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, View } from "react-native";

import { iconMap } from "../../types";

type FinishRequestCardProps = {
  item: any;
};

const FinishRequestCard: FC<FinishRequestCardProps> = ({ item }) => {
  return (
    <View className="flex-col gap-3 rounded-2xl">
      <View className="flex-row justify-between items-center bg-white rounded-2xl p-4">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            className="mr-3"
            name={iconMap[item.id]}
            size={24}
          />
          <Text className="ml-1">{item.title}</Text>
        </View>
        <View className="flex-col-reverse">
          <Text>{item.count} шт</Text>
        </View>
      </View>
    </View>
  );
};

export default FinishRequestCard;
