import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { HistoryItemType } from "../../../types";

type Props = {
  data: HistoryItemType[];
  value?: string;
};

export function History({ data }: Props) {
  const router = useRouter();

  return (
    <BaseAccordion title="История обслуживания" icon="clock" value="history">
      <View className="flex-col">
        {data.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={() => router.push(`/requests/history/${item.id}`)}
            className={cn(
              "flex-row justify-between items-center w-full border-gray-200",
              data.length - 1 !== index ? "border-b pb-4" : "pb-1",              
              index !== 0 ? "pt-4" : 'pt-1',              
            )}
          >
            <Text className="text-base text-gray-700">{item.date}</Text>
            <Feather name="chevron-right" size={18} className="-mr-2"/>
          </Pressable>
        ))}
      </View>
    </BaseAccordion>
  );
}
