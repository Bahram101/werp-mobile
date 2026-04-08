import { COLORS } from "@/constants/theme";
import {
  SelectedSparePartItem,
  SparePartItem,
} from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { CirclePlus, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

type SparePartsProps = {
  data: SparePartItem[];
};

const SparePart = ({ data }: SparePartsProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();
  const [selectedSparePartIds, setSelectedSparePartIds] = useState<string[]>(
    [],
  );
  const [selectedSpareParts, setSelectedSpareParts] = useState<
    SelectedSparePartItem[]
  >([]);

  const totalAmount = selectedSpareParts.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  const handleOpenSelectModal = () => {
    showBottomSheet(
      "spareParts",
      {
        data,
        selectedSparePartIds,
        handleSelectSpareParts,
        handleAddPart,
      },
      { title: "Продажа запчастей", snapPoints: ["95%"] },
    );
  };

  // const handleSelectSpareParts = (ids: string[]) => {
  //   console.log("handleSelectSpareParts", ids);
  //   setSelectedSparePartIds(ids);
  //   const newSelected = data.filter((item) => ids.includes(item.id.toString()));
  //   setSelectedSpareParts(newSelected);
  //   updateModalProps({ selectedSparePartIds: ids });
  // };

  const handleSelectSpareParts = (ids: string[]) => {
    setSelectedSparePartIds(ids);
    const selected = data
      .filter((item) => ids.includes(String(item.id)))
      .map((item) => {
        // если уже есть — сохранить qty
        const existing = selectedSpareParts.find((p) => p.id === item.id);

        return (
          existing || {
            ...item,
            selectedQty: 1,
            totalPrice: item.price,
          }
        );
      });

    setSelectedSpareParts(selected);
    updateModalProps({ selectedSparePartIds: ids });
  };

  const handleRemoveSparePart = (id: number) => {
    const updated = selectedSpareParts.filter((item) => item.id !== id);
    const updatedIds = updated.map((i) => String(i.id));
    setSelectedSpareParts(updated);
    setSelectedSparePartIds(updatedIds);
    updateModalProps({ selectedSparePartIds: updatedIds });
  };

  const handleAddPart = (item: SparePartItem, qty: number) => {
    const preparedItem = {
      ...item,
      selectedQty: qty,
      totalPrice: item.price * qty,
    };
    const existingIndex = selectedSpareParts.findIndex(
      (part) => part.id === item.id,
    );

    const updated =
      existingIndex >= 0
        ? selectedSpareParts.map((part) =>
            part.id === item.id ? preparedItem : part,
          )
        : [...selectedSpareParts, preparedItem];

    setSelectedSpareParts(updated);
    setSelectedSparePartIds(updated.map((i) => String(i.id)));
  };

  console.log(
    "selectedSpareParts",
    JSON.stringify(selectedSpareParts, null, 2),
  );

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
