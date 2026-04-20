import SparePartActionSheet from "@/components/ui/actionsheet/SparePartActionSheet";
import Layout from "@/components/ui/master/Layout";
import { useActionSheet } from "@/providers/ActionSheetProvider";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import * as Haptics from "expo-haptics";
import { useNavigation } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useMaterials } from "../../hooks/useMaterials";
import { MaterialDto, SelectedMaterialItem } from "../../types";
import MaterialsTable from "./components/MaterialsTable";

const CreateAccountabilityRequest = () => {
  const navigation = useNavigation();
  const { openSheet, closeSheet } = useActionSheet();
  const { showBottomSheet, updateModalProps } = useBottomSheet();
  const { data, isLoading } = useMaterials();

  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const selectedIds = selectedItems.map((i) => String(i.matnr));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Создание заявку`,
    });
  }, [navigation]);

  useEffect(() => {
    updateModalProps({
      selectedIds,
      selectedItems,
    });
  }, [selectedItems, selectedIds, updateModalProps]);

  const handleOpenSelectModal = () => {
    showBottomSheet(
      "materials",
      {
        data,
        selectedIds,
        selectedItems,
        handleAddMaterial,
      },
      { title: "Выбрать материалы", snapPoints: ["80%"] },
    );
  };

  const handleAddMaterial = (item: MaterialDto, qty: number) => {
    const preparedItem = {
      ...item,
      selectedQty: qty,
    };

    setSelectedItems((prev) => {
      const exists = prev.find((p) => p.matnr === item.matnr);
      const updated = exists
        ? prev.map((p) => (p.matnr === item.matnr ? preparedItem : p))
        : [...prev, preparedItem];
      return updated;
    });
  };

  console.log("selectedItems", JSON.stringify(selectedItems, null, 2));

  const handleRemoveMaterial = (matnr: number) => {
    console.log("matnr", matnr);
    const updated = selectedItems.filter((item: any) => item.matnr !== matnr);
    const updatedIds = updated?.map((i: any) => String(i.matnr));
    setSelectedItems(updated);
    updateModalProps({ selectedServiceIds: updatedIds });
  };

  const handlePressOnRow = (item: SelectedMaterialItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const existing = selectedItems?.find((p) => p.matnr === item.matnr);
    openSheet(
      <SparePartActionSheet
        item={item}
        isSelected={true}
        initialQty={existing?.selectedQty || 1}
        onAdd={(qty) => handleAddMaterial(item, qty)}
        closeSheet={closeSheet}
      />,
    );
  };

  console.log("selectedIds", selectedIds);
  console.log("selectedItems", JSON.stringify(selectedItems, null, 2));

  return (
    <Layout>
      <View className="work-block bg-white mt-3 rounded-2xl p-4 ">
        <View className="work-block-top pt-2 mb-4 py-3 border-b border-grayLight flex-row justify-between items-center ">
          <Text className="font-bold text-primary uppercase">Материалы</Text>
          <View>
            <Pressable
              className="flex-1 text-center flex-row justify-center"
              onPress={handleOpenSelectModal}
            >
              <CirclePlus color="green" size={20} />
            </Pressable>
          </View>
        </View>
        <MaterialsTable
          data={data}
          selectedItems={selectedItems}
          handlePressOnRow={handlePressOnRow}
          handleRemoveMaterial={handleRemoveMaterial}
        />
      </View>
    </Layout>
  );
};

export default CreateAccountabilityRequest;
