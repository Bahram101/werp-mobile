import { COLORS } from "@/constants/theme";
import {
  SelectedSparePartItem,
  SparePartItem,
} from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { CirclePlus, Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

type SparePartsProps = {
  data: SparePartItem[];
};

const SparePart = ({ data }: SparePartsProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();

  const [selectedSpareParts, setSelectedSpareParts] = useState<
    SelectedSparePartItem[]
  >([]);

  const selectedIds = selectedSpareParts.map((i) => String(i.id));

  const totalAmount = selectedSpareParts.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );

  useEffect(() => {
    updateModalProps({
      selectedIds,
    });
  }, [selectedSpareParts, selectedIds, updateModalProps]);

  const handleOpenSelectModal = () => {
    showBottomSheet(
      "spareParts",
      {
        data,
        selectedIds,
        handleAddPart,
      },
      { title: "Продажа запчастей", snapPoints: ["80%"] },
    );
  };

  const handleRemoveSparePart = (id: number) => {
    const updated = selectedSpareParts.filter((item) => item.id !== id);
    const updatedIds = updated.map((i) => String(i.id));
    setSelectedSpareParts(updated);
    updateModalProps({ selectedSparePartIds: updatedIds });
  };

  const handleAddPart = (item: SparePartItem, qty: number) => {
    const preparedItem = {
      ...item,
      selectedQty: qty,
      totalPrice: item.price * qty,
    };

    setSelectedSpareParts((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      const updated = exists
        ? prev.map((p) => (p.id === item.id ? preparedItem : p))
        : [...prev, preparedItem];

      return updated;
    });
  };

  console.log(
    "selectedSpareParts",
    JSON.stringify(selectedSpareParts, null, 2),
  );
  console.log("selectedIds", selectedIds);

  return (
    <View className="work-block bg-white mt-3 rounded-2xl p-4">
      <View className="work-block-top py-4 pt-2 border-b mb-4 border-grayLight flex-row justify-between items-center">
        <Text className="font-bold text-primary uppercase">
          Продажа запчастей
        </Text>
        <View>
          <Pressable
            className="flex-1 text-center flex-row justify-center"
            onPress={handleOpenSelectModal}
          >
            <CirclePlus color="green" size={20} />
          </Pressable>
        </View>
      </View>

      <View className="table">
        <View className="table-header flex-row justify-between border-b border-grayLight pb-3">
          <View className="table-head-col w-[8%]">
            <Text className="font-semibold">№</Text>
          </View>
          <View className="table-head-col w-[50%]">
            <Text className="font-semibold">Название усл</Text>
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
          {selectedSpareParts.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center border-b border-grayLight py-3"
            >
              <Text className="w-[8%] text-center">{item.id}</Text>
              <Text className="w-[50%] text-center">{item.name}</Text>
              <Text className="w-[15%] text-center">{item.selectedQty}</Text>
              <Text className="w-[20%] text-center">{item.totalPrice}</Text>
              <View className="w-[7%] p-1 items-center justify-center">
                <TouchableOpacity
                  onPress={() => handleRemoveSparePart(item.id)}
                >
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
    </View>
  );
};

export default SparePart;
