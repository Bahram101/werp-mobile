import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { MatnrItem } from "@/features/master/requests/types";
import { formatFullName, tenge } from "@/utils/helpers";
import { Minus, Plus, X } from "lucide-react-native";
import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  item: MatnrItem;
  isSelected: boolean;
  onAdd: (qty: number) => void;
  initialQty?: number;
  closeSheet: () => void;
};

const SparePartActionSheet: FC<Props> = ({
  item,
  isSelected,
  onAdd,
  closeSheet,
  initialQty,
}) => {
  const [qty, setQty] = useState(initialQty || 1);

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };

  const totalAmount = item.price * qty;

  const handleAdd = () => {
    onAdd(qty);
    closeSheet();
  };

  return (
    <View className="gap-7 w-full pt-4 pb-[55px]">
      <View className="flex-row justify-between items-center px-1">
        <Text className="font-bold text-2xl">Вы выбрали</Text>
        <Pressable onPress={closeSheet}>
          <X size={26} />
        </Pressable>
      </View>

      <View className="gap-4">
        <View className="flex-row justify-between">
          <Text className="text-lg">{formatFullName(item?.matnrName)}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-3 items-center">
            <Pressable
              onPress={decreaseQty}
              className="px-1 py-1 border border-grayLight rounded-md items-center justify-center"
            >
              <Minus size="20" />
            </Pressable>
            <View className="min-w-[60px]">
              <Text>{qty} шт</Text>
            </View>
            <Pressable
              className="px-1 py-1 border border-grayLight rounded-md items-center justify-center"
              onPress={increaseQty}
            >
              <Plus size="20" />
            </Pressable>
          </View>
          <View className="totalSum">
            <Text className="text-xl">
              {totalAmount} {tenge}
            </Text>
          </View>
        </View>
      </View>

      <AnimatedButton
        className="h-12 p-2"
        bg={"blue"}
        bgPressed={"blueDark"}
        iconColor="white"
        onPress={handleAdd}
      >
        <Text>{isSelected ? "Изменить" : "Добавить"}</Text>
      </AnimatedButton>
    </View>
  );
};

export default SparePartActionSheet;
