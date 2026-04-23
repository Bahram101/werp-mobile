import { Loader } from "@/components/ui/Loader";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React from "react";
import { Dimensions, View } from "react-native";
import { MaterialDto } from "../../../types";
import MaterialModalListItem from "./MaterialModalListItem";

type Props = {
  items: any[];
  loading: boolean;
  selectedIds: string[];
  selectedItems: MaterialDto[];
  search: string;
  handleAddMaterial: (item: MaterialDto, qty: number) => void;
};

const MaterialModalList = ({
  items = [],
  loading,
  selectedIds = [],
  selectedItems,
  search,
  handleAddMaterial,
}: Props) => {
  const screenHeight = Dimensions.get("window").height;

  const filteredItems = items.filter(
    (item) =>
      item.matnrName.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <View
        className="flex-1 justify-center items-center py-10"
        style={{ height: screenHeight * 0.6 }}
      >
        <Loader />
      </View>
    );
  }

  return (
    <BottomSheetFlatList
      data={filteredItems}
      keyExtractor={(item: any) => item.matnr.toString()}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}
      renderItem={({ item, index }: { item: MaterialDto; index: number }) => (
        <MaterialModalListItem
          item={item}
          isLast={index === filteredItems.length - 1}
          isSelected={selectedIds.includes(String(item.matnr))}
          selectedItems={selectedItems}
          onAddMaterial={handleAddMaterial}
        />
      )}
    />
  );
};

export default MaterialModalList;
