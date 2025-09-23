import { useAuth } from "@/features/auth/hooks/useAuth";
import { getSurnameAndName } from "@/utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

export default function MainHeader() {
  const { user, logout } = useAuth();

  return (
    <View className="bg-blue px-4 py-3 flex-row items-end justify-between h-[110px] rounded-bl-3xl rounded-br-3xl">
      <View className="flex-row items-center gap-3">
        <Image
          source={require("@/assets/images/user2.png")}
          className="w-12 h-12"
        />
        <Text className="text-white font-bold text-lg">
          {getSurnameAndName(user?.user_full_name)}
        </Text>
      </View>
      <View className="flex-row gap-5">
        <MaterialCommunityIcons
          name="bell"
          size={24}
          className="-translate-y-2"
          color="white"
        />
        <View>
          <MaterialCommunityIcons
            className="mr-3 -translate-y-2"
            name="logout"
            onPress={logout}
            size={22}
            color="white"
          />
        </View>
      </View>
    </View>
  );
}
