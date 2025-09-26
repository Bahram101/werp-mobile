import { COLORS } from "@/constants/theme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getSurnameAndName } from "@/utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

export default function MainHeader() {
  const { user } = useAuth();

  return (
    <View className="rounded-bl-3xl rounded-br-3xl overflow-hidden" style={{ height: 180 }}>
      <ImageBackground
        source={require("@/assets/images/back.png")}
        resizeMode="cover"
        className="px-5 py-3 flex-row items-center justify-between h-full w-full"
      >
        <View className="absolute inset-0 bg-white/70" />
        <View className="flex-row items-center gap-3">
          <Image
            source={require("@/assets/images/user2.png")}
            className="w-12 h-12"
          />
          <View>
            <Text style={{ color: COLORS.primaryDark }}>Сәлеметсіз бе!</Text>
            <Text
              className={`font-bold text-2xl`}
              style={{ color: COLORS.primaryDark }}
            >
              {getSurnameAndName(user?.user_full_name)}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-5">
          <MaterialCommunityIcons
            name="bell-ring"
            size={24}
            color="text-primary"
            style={{ color: COLORS.primaryDark }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
