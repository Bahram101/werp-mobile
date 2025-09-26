import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";

import { IRequest } from "@/types/request.interface";

import { getStatusMeta } from "@/utils/status.helper";

import { COLORS } from "@/constants/theme";
import { router } from "expo-router";

type ActiveRequestCardProps = {
  item: IRequest;
};

const ActiveRequestCard: FC<ActiveRequestCardProps> = ({ item }) => {
  return (
    <Pressable
      className="bg-white mt-3 rounded-2xl p-4"
      onPress={() =>
        router.push(
          {
            pathname: "/messages/[id]",
            params: { id: item.id, title: item.title },
          },
          // { id: item.id }
        )
      }
    >
      <View className="flex-row items-center pb-3 justify-between border-b mb-3 border-grayLight">
        <View className={cn("flex-row items-center")}>
          <Text className="bg-primary text-white px-2 py-1 rounded-lg text-xs">
            {item.title}
          </Text>
        </View>
        <Text className="text-sm font-semibold">ЗАЯВКА № {item.number}</Text>
      </View>
      <View className="flex-row justify-between">
        <View className="flex-row items-start gap-3 pl-3 border-l-4 border-primary">
          <View className="gap-2">
            <>
              <Text>{item.date}</Text>
              <Text>{item.time}</Text>
            </>
            <View className="flex-row mb-1">
              <Feather name="map-pin" size={18} color={COLORS.grayDark} />
              <Text className="ml-2">{item.address}</Text>
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
    </Pressable>
  );
};

export default ActiveRequestCard;
