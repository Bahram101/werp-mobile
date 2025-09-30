import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import React, { FC } from "react";
import { Text, View } from "react-native";

import { getStatusMeta } from "@/utils/status.helper";

import AnimatedButton from "@/components/ui/button/AnimatedBlock";
import { COLORS } from "@/constants/theme";
import { IRequest } from "../../types";

type ActiveRequestCardProps = {
  item: IRequest;
};

const ActiveRequestCard: FC<ActiveRequestCardProps> = ({ item }) => {
  return (
    <AnimatedButton item={item}>
      <View className="flex-row items-center justify-between mb-3 border-b border-grayLight pb-2">
        <View className="bg-primary h-6 justify-center flex rounded px-3">
          <Text className="text-white text-xs">{item.title}</Text>
        </View>
        <View>
          <Text className="text-sm font-semibold">ЗАЯВКА № {item.number}</Text>
        </View>
      </View>
      <View className="flex-row justify-between">
        <View className="flex-row items-start gap-3 pl-3 border-l-4 border-primary">
          <View className="gap-2">
            <>
              <Text>{item.date}</Text>
              <Text>{item.time}</Text>
            </>
            <View className="flex-row mb-1 items-center gap-2">
              <Feather name="map-pin" size={18} color={COLORS.grayDark} />
              <Text>{item.address}</Text>
            </View>
          </View>
        </View>
        <View className="flex-col-reverse">
          <View className="flex-row items-center">
            <Text
              className={cn("text-sm mr-2", getStatusMeta(item.status).text)}
            >
              {getStatusMeta(item.status).label}
            </Text>
            <View
              className={cn(
                "w-6 h-6 rounded-full justify-center items-center ml-2",
                getStatusMeta(item.status).bgOuter
              )}
            >
              <View
                className={cn(
                  "w-4 h-4 rounded-full",
                  getStatusMeta(item.status).bgInner
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </AnimatedButton>
  );
};

export default ActiveRequestCard;
