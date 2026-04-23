import { COLORS } from "@/constants/theme";
import { SelectedMatnrItem } from "@/features/master/requests/types";
import { strToLowerCase, tenge } from "@/utils/helpers";
import { Trash2 } from "lucide-react-native";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  selectedItems: SelectedMatnrItem[];
  totalAmount: number;
  handlePress: (item: SelectedMatnrItem) => void;
  handleRemoveSparePart: (id: number) => void;
};

const CartridgeTable = ({
  selectedItems,
  totalAmount,
  handlePress,
  handleRemoveSparePart,
}: Props) => {
  return (
    <View className="table">
      <View className="table-header flex-row justify-between border-b border-grayLight pb-3">
        <View className="table-head-col w-[8%]">
          <Text className="font-semibold">№</Text>
        </View>
        <View className="table-head-col w-[50%]">
          <Text className="font-semibold">Название</Text>
        </View>
        <View className="table-head-col w-[15%]">
          <Text className="font-semibold">Кол.</Text>
        </View>
        <View className="table-head-col w-[20%]">
          <Text className="font-semibold">Сумма</Text>
        </View>
        <View className="table-head-col w-[7%]"></View>
      </View>
      <View className="table-body flex-col">
        {selectedItems.map((item: any) => (
          <TouchableOpacity
            key={item.index}
            className="flex-row justify-between items-center border-b border-grayLight py-3 active:opacity-70"
            onPress={() => handlePress(item)}
          >
            <Text className="w-[8%] text-center">{item.fno}</Text>
            <Text className="w-[50%] text-center">
              {strToLowerCase(item.matnrName)}
            </Text>
            <Text className="w-[15%] text-center">{item.selectedQty}</Text>
            <Text className="w-[20%] text-center">{item.totalPrice}</Text>
            <View className="w-[7%] p-1 items-center justify-center">
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  handleRemoveSparePart(item.index);
                }}
              >
                <Trash2 size={18} color={COLORS.red} />
              </Pressable>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-end pt-3">
        <Text className="font-semibold">
          {`Итог: ${totalAmount}`} {tenge}
        </Text>
      </View>
    </View>
  );
};

export default CartridgeTable;
