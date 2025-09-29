import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, View } from "react-native";

import { COLORS } from "@/constants/theme";
import { getPaymentLabel } from "@/utils/status.helper";
import { IRequest } from "../../types";

type DoneRequestCardProps = {
  item: IRequest;
};

const DoneRequestCard: FC<DoneRequestCardProps> = ({ item }) => {
  const paymentType = item.paymentType;
  return (
    <View className="bg-white mb-3 rounded-2xl p-3">
      <View className="flex-row items-center pb-3 border-b mb-3 border-grayLight gap-2">
        <Feather
          name={"check"}
          size={14}
          color={"white"}
          className="bg-primary rounded-full"
          style={{ padding: 2 }}
        />
        <View>
          <Text className="text-sm font-semibold">ЗАЯВКА № {item.number}</Text>
        </View>
      </View>

      <View className="gap-2">
        <View className="flex-row gap-2">
          <Feather name="map-pin" size={18} color={COLORS.grayDark} />
          <Text>{item.address}</Text>
        </View>
        <View className="flex-row gap-2">
          <MaterialCommunityIcons
            name={paymentType === "1" ? "cash-100" : "credit-card"}
            size={18}
            color={COLORS.grayDark}
          />
          <Text>{getPaymentLabel(paymentType)}:</Text>
          <Text>{item.paid}т</Text>
        </View>
      </View>
    </View>
  );
};

export default DoneRequestCard;
