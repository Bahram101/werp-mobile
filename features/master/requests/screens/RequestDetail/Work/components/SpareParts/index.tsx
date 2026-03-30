import { SparePartItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { CirclePlus, EllipsisVertical } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

type SparePartsTableProps = {
  data: SparePartItem[];
};

const SparePartTable = ({ data }: SparePartsTableProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();

  const [selectedSpareParts, setSelectedSpareParts] = useState<SparePartItem[]>(
    [],
  );
  const [selectedSparePartIds, setSelectedSparePartIds] = useState<string[]>(
    [],
  );

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

  const handleSelectSpareParts = (ids: string[]) => {
    // setSelectedSparePartIds(ids);
    // const newSelected = data.filter((item) => ids.includes(item.id.toString()));
    // setSelectedSpareParts(newSelected);
    // updateModalProps({ selectedSparePartIds: ids });
  };

  const handleRemoveSparePart = (id: number) => {
    const updated = selectedSpareParts.filter((item) => item.id !== id);
    setSelectedSpareParts(updated);
    setSelectedSparePartIds(updated.map((i) => String(i.id)));
    updateModalProps({ selectedSparePartIds: String(id) });
  };

  const handleAddPart = (item: SparePartItem, qty: number) => {
    const updated = [
      ...selectedSpareParts,
      { ...item, quantity: qty, price: item.price * qty },
    ];

    setSelectedSpareParts(updated);
    setSelectedSparePartIds(updated.map((i) => String(i.id)));
  };

  return (
    <View className="work-block bg-white mt-3 rounded-2xl p-4">
      <View className="work-block-top pb-4 pt-2 border-b mb-4 border-grayLight flex-row justify-between">
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
              <Text className="w-[15%] text-center">{item.quantity}</Text>
              <Text className="w-[20%] text-center">{item.price}</Text>
              <View className="w-[7%]">
                <TouchableOpacity>
                  <EllipsisVertical />
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                className="w-[20%] items-center"
                onPress={() => handleRemoveSparePart(item.id)}
              >
                <CircleX color="red" size={20} />
              </TouchableOpacity> */}
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

export default SparePartTable;
