import { COLORS } from "@/constants/theme";
import { IDepartment } from "@/types/department.interface";
import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function MessageItem({
  item,
  data,
  index,
}: {
  item: IDepartment;
  data: IDepartment[];
  index: number;
}) {
  return (
    <Link
      href={{
        pathname: "/messages/[id]",
        params: { id: item.id, title: item.name },
      }}
      asChild
    >
      <TouchableOpacity
        className={cn(
          "flex-row border-grayLight p-4 justify-between items-center",
          data.length - 1 !== index && "border-b"
        )}
      >
        <View className="flex-row items-center gap-4">
          <Feather
            name={item.icon}
            size={30}
            style={{ color: COLORS.primary }}
          />
          <View className="flex-col ml-4">
            <Text className="text-lg text-primary mb-1">
              {item.name.toUpperCase()}
            </Text>
            <Text className="text-xs text-grayDark">Описание уведомлении</Text>
          </View>
        </View>
        <Text className="text-sm ">{item.date}</Text>
      </TouchableOpacity>
    </Link>
  );
}
