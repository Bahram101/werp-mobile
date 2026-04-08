import { formatCurrency } from "@/utils/helpers";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  data: any;
  finishedSummaryData?: any;
};

const FinishedSummary = ({ data, finishedSummaryData }: Props) => {
  return (
    <View className="bg-white rounded-2xl flex-col gap-4 p-5 mt-2">
      <View className="flex-row justify-center border-b border-grayLight pb-4 font-bold">
        <Text className="font-bold text-grayDark"> ЗАВЕРЩЕНО: </Text>
        <Text className="font-bold text-primary">
          {finishedSummaryData.listData?.length} ЗАЯВОК
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Text className="font-bold text-grayDark">ПРЕМЯ:</Text>
        <Text className="font-bold text-primary">
          {" "}
          {formatCurrency(finishedSummaryData?.listSum?.masterPremium ?? 0)}
        </Text>
      </View>
    </View>
  );
};

export default FinishedSummary;
