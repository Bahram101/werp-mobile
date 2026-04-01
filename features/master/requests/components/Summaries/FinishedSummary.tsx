import React from "react";
import { Text, View } from "react-native";


type Props = {
  data: any;
};

const FinishedSummary = ({ data }: Props) => {
  return (
    <View className="p-5 bg-white rounded-2xl flex-col gap-4 my-3">
      <View className="flex-row justify-center border-b border-grayLight pb-4 font-bold">
        <Text className="font-bold text-grayDark">ЗАВЕРЩЕНО: </Text>
        <Text className="font-bold">{data.length} ЗАЯВОК</Text>
      </View>
      <View className="flex-row justify-center">
        <Text className="font-bold text-grayDark">ПРЕМЯ: </Text>
        {/* <Text className="font-bold">{formatCurrency(675486)} </Text> */}
        <Text className="font-bold">... </Text>
      </View>
    </View>
  );
};

export default FinishedSummary;
