import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, View } from "react-native";

import AnimatedBlock from "@/components/ui/button/AnimatedBlock";
import { ROUTES } from "@/constants/routes";
import { COLORS } from "@/constants/theme";
import { tenge } from "@/utils/helpers";
import { getPaymentLabel } from "@/utils/status.helper";
import { router } from "expo-router";

type DoneRequestCardProps = {
  item: any;
};

const DoneRequestCard: FC<DoneRequestCardProps> = ({ item }) => {
  const paymentType = item?.draftPayload?.paymentType;
  const sumTotal = item?.draftPayload?.sumTotal;

  const handlePress = () => {
    router.push({
      pathname: ROUTES.REQUEST_DONE,
      params: { id: item.id },
    });
  };

  console.log("item in DoneRequestCard", JSON.stringify(item, null, 2));

  return (
    <AnimatedBlock onPress={handlePress}>
      <View className="flex-row items-center pb-3 border-b mb-3 border-grayLight gap-2">
        <Feather
          name={"check"}
          size={14}
          color={"white"}
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            padding: 2,
          }}
        />
        <View>
          <Text className="text-sm font-semibold">
            ЗАЯВКА № {item.applicationNumber}
          </Text>
        </View>
      </View>

      <View className="gap-2">
        <View className="flex-row gap-2">
          <Feather name="map-pin" size={18} color={COLORS.grayDark} />
          <Text className="flex-1 flex-wrap">{item.draftPayload.address}</Text>
        </View>
        <View className="flex-row gap-2">
          <MaterialCommunityIcons
            name={paymentType === "CASH" ? "cash-100" : "credit-card"}
            size={18}
            color={COLORS.grayDark}
          />
          <Text>{getPaymentLabel(paymentType)}:</Text>
          <Text>
            {sumTotal}
            {tenge}
          </Text>
        </View>
      </View>
    </AnimatedBlock>
  );
};

export default DoneRequestCard;
