import { COLORS } from "@/constants/theme";
import { strToLowerCase } from "@/utils/helpers";
import { Trash2 } from "lucide-react-native";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { MaterialDto, SelectedMaterialItem } from "../../../types";

type Props = {
  data: MaterialDto[];
  selectedItems?: SelectedMaterialItem[];
  totalAmount?: number;
  handlePressOnRow?: (item: SelectedMaterialItem) => void;
  handleRemoveMaterial?: (id: number) => void | undefined;
};

const MaterialsTable = ({
  selectedItems,
  totalAmount,
  handlePressOnRow,
  handleRemoveMaterial,
}: Props) => {
  return (
    <View className="table">
      <View className="table-header flex-row justify-between border-b border-grayLight pb-3">
        <View className="table-head-col w-[25%]">
          <Text className="font-semibold">Код</Text>
        </View>
        <View className="table-head-col w-[50%]">
          <Text className="font-semibold">Название</Text>
        </View>
        <View className="table-head-col w-[15%]">
          <Text className="font-semibold">Кол.</Text>
        </View>
        <View className="table-head-col w-[10%]"></View>
      </View>
      <View className="table-body flex-col">
        {selectedItems?.map((item) => (
          <TouchableOpacity
            key={item.matnr}
            className="flex-row justify-between items-center border-b border-grayLight py-3 active:opacity-70"
            onPress={() => handlePressOnRow?.(item)}
          >
            <Text className="w-[25%] text-center">{item.code}</Text>
            <Text className="w-[50%] text-center">
              {strToLowerCase(item.matnrName)}
            </Text>
            <Text className="w-[15%] text-center">{item.selectedQty}</Text>
            <View className="w-[10%] p-1 items-center justify-center">
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  handleRemoveMaterial?.(item.matnr);
                }}
              >
                <Trash2 size={18} color={COLORS.red} />
              </Pressable>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-end pt-3">
        {/* <Text>{`Итог: ${totalAmount}`}</Text> */}
      </View>
    </View>
  );
};

export default MaterialsTable;
