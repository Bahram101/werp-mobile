import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocalSearchParams, useNavigation } from "expo-router";
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

  console.log("ID=>", id);
  console.log("NUMBER=>", number);
  const data = [
    { id: 1, name: "Установка", price: 7500, currency: "KZT" },
    { id: 2, name: "Услуга", price: 2500, currency: "KZT" },
  ];

  return (
    <View className="bg-white mt-3 rounded-2xl p-3 mx-4 ">
      <View className="flex-row items-center pb-4 pt-3 border-b mb-4 border-grayLight gap-2">
        <Text className="font-bold text-primary">УСЛУГИ</Text>
      </View>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]">№</TableHead>
            <TableHead className="text-sm">Название усл</TableHead>
            <TableHead>Сумма</TableHead>
            <TableHead>Валюта</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableData>{item.id}</TableData>
              <TableData>{item.name}</TableData>
              <TableData>{item.price}</TableData>
              <TableData>{item.currency}</TableData>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableHead>Total</TableHead>
            <TableHead>22</TableHead>
            <TableHead>$340</TableHead>
          </TableRow>
        </TableFooter> */}
      </Table>
    </View>
  );
};

export default RequestWorkScreen;
