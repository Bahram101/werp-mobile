import AppBottomSheet, {
  AppBottomSheetRef,
} from "@/components/ui/bottom-sheet/AppBottomSheet";
import { Input } from "@/components/ui/input";
import React, { useRef } from "react";
import { Button, Text, View } from "react-native";

const App = () => {
  const modalRef = useRef<AppBottomSheetRef>(null);

  const saveTask = () => {
    console.log("Задача сохранена!");
    modalRef.current?.close();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg mb-4">Пример BottomSheet</Text>

      <Button title="Создать задачу" onPress={() => modalRef.current?.open()} />
        
      <AppBottomSheet ref={modalRef} title="Создать задачу">
        <Text>Название задачи:</Text>
        <Input className="border p-2 my-2" />
        <Button title="Сохранить" onPress={saveTask} />
      </AppBottomSheet>
    </View>
  );
};

export default App;
