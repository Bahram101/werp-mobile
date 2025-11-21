import { useBottomSheet } from "@/providers/AppBottomSheetProvider";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

const App = () => {
  const { openBottomSheet, setBottomSheetTitle, setBottomSheetContent, setBottomSheetSnapPoints } =
    useBottomSheet();

  const openAddServiceSheet = () => {
    openBottomSheet();
    setBottomSheetTitle("Выбрать услуги!!!");
    setBottomSheetSnapPoints(["95%"]);
    setBottomSheetContent(
      <View>
        <Text>Форма добавления услуги</Text>
        <TextInput placeholder="Название" />
        <TextInput placeholder="Цена" keyboardType="numeric" />
      </View>
    );
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg mb-4">Пример BottomSheet</Text>
      <Button title="Создать задачу" onPress={openAddServiceSheet} />
    </View>
  );
};

export default App;
