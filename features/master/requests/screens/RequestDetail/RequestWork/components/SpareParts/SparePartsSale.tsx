import { SparePartItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/AppBottomSheetProvider";
import { CirclePlus, CircleX } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SparePartsTableProps = {
  data: SparePartItem[];
};

const SparePartTable = ({ data }: SparePartsTableProps) => {
  const [selectedSpareParts, setSelectedSpareParts] = useState<SparePartItem[]>(
    []
  );
  const [selectedSparePartIds, setSelectedSparePartIds] = useState<string[]>(
    []
  );

  const { showBottomSheet } = useBottomSheet();

  const totalPrice = selectedSpareParts.reduce(
    (sum, item) => sum + item.price,
    0
  );

  // ⭐ Открываем модалку
  const handleOpenSelectModal = () => {
    showBottomSheet("spareParts", {
      data,
      selectedSparePartIds,
      handleSelectSpareParts,
    });
  };

  // ⭐ Выбор запчастей
  const handleSelectSpareParts = (ids: string[]) => {
    setSelectedSparePartIds(ids);

    const newSelected = data.filter((item) => ids.includes(item.id.toString()));

    setSelectedSpareParts(newSelected);
  };

  // ⭐ Удаление запчасти
  const handleRemoveSparePart = (id: number) => {
    const updated = selectedSpareParts.filter((item) => item.id !== id);

    setSelectedSpareParts(updated);
    setSelectedSparePartIds(updated.map((i) => String(i.id)));
  };

  return (
    <View className="table">
      <View className="table-header flex-row justify-between border-b border-grayLight pb-3">
        <Text className="table-head-col w-[10%] font-semibold">№</Text>
        <Text className="table-head-col w-[50%] font-semibold">
          Название усл
        </Text>
        <Text className="table-head-col w-[20%] font-semibold">Сумма</Text>

        <View className="table-head-col w-[20%] border-r border-grayLight">
          <TouchableOpacity onPress={handleOpenSelectModal}>
            <CirclePlus color="green" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="table-body flex-col">
        {selectedSpareParts.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center border-b border-grayLight py-3"
          >
            <Text className="w-[10%] text-center">{item.id}</Text>
            <Text className="w-[50%] text-center">{item.name}</Text>
            <Text className="w-[20%] text-center">{item.price}</Text>

            <TouchableOpacity
              className="w-[20%] items-center"
              onPress={() => handleRemoveSparePart(item.id)}
            >
              <CircleX color="red" size={20} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View className="flex-row justify-end pt-3">
        <Text>{`Итог: ${totalPrice}`}</Text>
      </View>
    </View>
  );
};

export default SparePartTable;
