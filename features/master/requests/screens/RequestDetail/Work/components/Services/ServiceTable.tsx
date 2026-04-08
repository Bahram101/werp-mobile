import { COLORS } from "@/constants/theme";
import { Trash2 } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  data: any[];
  totalAmount: any;
  handleRemoveService: (id: number) => void;
};

const Table = ({ data, totalAmount, handleRemoveService }: Props) => {
  return (
    <View className="table">
      <View className="table-header flex-row justify-between border-b border-grayLight pb-3">
        <View className="table-head-col w-[10%]">
          <Text className="font-semibold">№</Text>
        </View>
        <View className="table-head-col w-[60%]">
          <Text className="font-semibold">Название усл</Text>
        </View>
        <View className="table-head-col w-[23%]">
          <Text className="font-semibold">Сумма</Text>
        </View>
        <View className="table-head-col w-[7%]"></View>
      </View>

      <View className="table-body flex-col">
        {data.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center border-b border-grayLight py-3"
          >
            <Text className="w-[10%] text-center">{item.id}</Text>
            <Text className="w-[60%] text-center">{item.name}</Text>
            <Text className="w-[23%] text-center"> </Text>
            <View className="w-[7%] p-1 items-center justify-center">
              <TouchableOpacity onPress={() => handleRemoveService(item.id)}>
                <Trash2 size={18} color={COLORS.red} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View className="flex-row justify-end pt-3">
        <Text>{`Итог: ${totalAmount}`}</Text>
      </View>
    </View>
  );
};

export default Table;
