import { ROUTES } from "@/constants/routes";
import { COLORS } from "@/constants/theme";
import cn from "clsx";
import { router } from "expo-router";
import { CalendarDays, ChevronRight } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AccountabilityItem({ item }: { item: any }) {
  const handlePress = () => {
    router.push({
      pathname: ROUTES.ACCOUNTABILITY_DETAIL,
      params: { id: item.id, regNumber: item.regNumber },
    });
  };

  return (
    <View
      className={cn(
        "border-grayLight p-3 pl-4 flex-row items-center justify-between rounded-xl bg-white mb-2",
      )}
    >
      <TouchableOpacity
        className="flex-1 flex-row items-center gap-5"
        onPress={handlePress}
      >
        <View className="flex-row items-center gap-1">
          <Text className="text-xl text-grayDark">№</Text>
          <Text numberOfLines={1} className="text-lg">
            {item.regNumber}
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <CalendarDays size={18} color={COLORS.grayDark} />
          <Text numberOfLines={1}>{item.createdAt}</Text>
        </View>
      </TouchableOpacity>

      <ChevronRight size={20} />
    </View>
  );
}
