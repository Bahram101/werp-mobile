import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, View } from "react-native";

import { getPaymentLabel } from "@/utils/status.helper";

import { COLORS } from "@/constants/theme";
import { IRequest } from "../../types";

type DoneRequestCardProps = {
  item: IRequest;
};

const DoneRequestCard: FC<DoneRequestCardProps> = ({ item }) => {
  return (
    <View className="bg-white mt-3 rounded-2xl p-4">
      <View className="flex-row items-center pb-3 border-b mb-3 border-grayLight">
        <Feather
          name="check"
          size={14}
          color={"white"}
          className="mr-2 bg-primary rounded-full p-1"
        />
        <View>
          <Text className="text-sm font-semibold">ЗАЯВКА № {item.number}</Text>
        </View>
      </View>
      <View className="flex-row justify-between">
        <View className="flex-row items-start gap-3">
          <View className="gap-2">
            <View className="flex-row mb-1">
              <Feather name="map-pin" size={18} color={COLORS.grayDark} />
              <Text className="ml-2">{item.address}</Text>
            </View>

            <View className="flex-row">
              <Feather name={"credit-card"} size={18} color={COLORS.grayDark} />
              <Text className="ml-2">{getPaymentLabel(item.paymentType)}:</Text>
              <Text className="ml-2">{item.paid}т</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoneRequestCard;
