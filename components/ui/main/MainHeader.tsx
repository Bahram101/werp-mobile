import { useAuth } from "@/features/auth/hooks/useAuth";
import { getSurnameAndName } from "@/utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function MainHeader() {
  const { user } = useAuth();

  console.log("uuuu", user?.user_full_name.split(" "));
  return (
    <View className="bg-blue px-4 py-3 flex-row items-end justify-between h-[110px] rounded-bl-3xl rounded-br-3xl">
      <View className="flex-row items-center gap-3">
        <Image
          source={require("@/assets/images/user2.png")}
          className="w-12 h-12"
        />
        <Text className="text-white font-bold text-lg">
          Hi, {getSurnameAndName(user?.user_full_name)}
        </Text>
      </View>

      <TouchableOpacity style={{ transform: [{ translateY: -8 }] }}>
        <MaterialCommunityIcons name="bell" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
