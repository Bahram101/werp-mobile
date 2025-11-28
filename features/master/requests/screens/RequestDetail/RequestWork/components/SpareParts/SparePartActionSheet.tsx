import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { SparePartItem } from "@/features/master/requests/types";
import { tenge } from "@/utils/helpers";
import { Minus, Plus, X } from "lucide-react-native";
import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  item: SparePartItem;
  closeSheet: () => void
};

const SparePartActionSheet: FC<Props> = ({ item, closeSheet }) => { 
  return (
    <View className="gap-7 w-full pt-4 pb-[55px]">
      <View className="flex-row justify-between items-center mb-4 px-1">
        <Text className="font-bold text-2xl">Вы выбрали</Text>
        <Pressable onPress={closeSheet}>
          <X size={26} />
        </Pressable>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-lg">{item?.name}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-3">
          <Pressable className="px-1 py-1 border border-grayLight rounded-md items-center justify-center">
            <Minus size="20" />
          </Pressable>
          <Text className="text-lg">1 шт</Text>
          <Pressable className="px-1 py-1 border border-grayLight rounded-md items-center justify-center">
            <Plus size="20" />
          </Pressable>
        </View>
        <View className="totalSum">
          <Text className="text-xl">452 684 {tenge}</Text>
        </View>
      </View>
      <AnimatedButton
        className="h-12 p-2"
        bg={"blue"}
        bgPressed={"blueDark"}
        iconColor="white"
      >
        <Text>Добавить</Text>
      </AnimatedButton>
    </View>
  );
};

export default SparePartActionSheet;
