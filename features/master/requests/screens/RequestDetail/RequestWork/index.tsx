import { useLocalSearchParams, useNavigation } from "expo-router";
import { CirclePlus, CircleX } from "lucide-react-native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const RequestWorkScreen = () => {
  const { id, number } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (number) {
      navigation.setOptions({
        headerTitle: `Заявка №${String(number)}`,
      });
    }
  }, [navigation, number]);

  const data = [
    { id: 1, name: "Установка", price: 7500, currency: "KZT" },
    { id: 2, name: "Услуга", price: 2500, currency: "KZT" },
    { id: 3, name: "Монтаж", price: 1500, currency: "KZT" },
  ];

  const totalPrice = data.reduce((acc, item) => acc + item.price, 0);

  return (
    <View className="bg-white mt-3 rounded-2xl p-3 mx-4 ">
      <View className="flex-row items-center pb-4 pt-2 border-b mb-4 border-grayLight gap-2">
        <Text className="font-bold text-primary">УСЛУГИ</Text>
      </View>
      <View>
        <View className="table">
          <View className="table-header flex-row justify-between border-b border-grayLight pb-2">
            <View className="table-head-col w-[10%]">
              <Text className="font-semibold">№</Text>
            </View>
            <View className="table-head-col w-[50%]">
              <Text className="font-semibold">Название усл</Text>
            </View>
            <View className="table-head-col w-[20%]">
              <Text className="font-semibold">Сумма</Text>
            </View>
            <View className="table-head-col w-[20%] border-r border-grayLight">
              <Text className="font-semibold">
                <CirclePlus color='green' size='20'/>
              </Text>
            </View>
          </View>
          <View className="table-body flex-col">
            {data.map((item) => (
              <View
                key={item.id}
                className="flex-row justify-between border-b border-grayLight py-2"
              >
                <View className="justify-center flex-row w-[10%]">
                  <Text>{item.id}</Text>
                </View>
                <View className="justify-center flex-row w-[50%]">
                  <Text>{item.name}</Text>
                </View>
                <View className="justify-center flex-row w-[20%]">
                  <Text>{item.price}</Text>
                </View>
                <View className="justify-center flex-row w-[20%]">
                   <CircleX color='red' size="20"/> 
                </View>
              </View>
            ))}
          </View>
          <View className="flex-row justify-end pt-3">
            <Text>{`Итог: ${totalPrice}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RequestWorkScreen;
