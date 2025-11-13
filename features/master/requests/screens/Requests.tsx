import RequestsScenes from "@/features/master/requests/components/RequestsScenes";
import RequestsTabBar from "@/features/master/requests/components/RequestsTabBar";
import { IRequest } from "@/features/master/requests/types";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { TabBarProps, TabView } from "react-native-tab-view";

export default function Requests() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "assigned", title: "Назначенные" },
    { key: "done", title: "Выполненные" },
    { key: "finished", title: "Завершенные" },
  ]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%"], []);
  const [filter, setFilter] = useState<"all" | "date" | "moved" | "cancelled">(
    "all"
  );

  const openSheet = useCallback(() => {
    console.log("openSheet called", bottomSheetRef.current);
    // Работает во всех версиях
    // bottomSheetRef.current?.expand?.();
    // bottomSheetRef.current?.snapToIndex?.(0);
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const data: IRequest[] = [
    {
      id: 1,
      title: "ЗАМЕНА КАРТРИДЖА",
      number: "1564654",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Мамыр-4, дом 138",
      status: 1,
      type: 1,
      paymentType: "1",
      paid: "34700",
    },
    {
      id: 2,
      title: "УСТАНОВКА СИСТЕМЫ",
      number: "1564674",
      date: "13 август",
      time: "11:40 — 12:20",
      address: "Мкр. Аксаи-4, дом 96, кв 10",
      status: 1,
      type: 2,
      paymentType: "2",
      paid: "15786",
    },
    {
      id: 3,
      title: "ЗАМЕНА КАРТРИДЖА",
      number: "1564632",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Таугуль-2, дом 17",
      status: 2,
      type: 2,
      paymentType: "1",
      paid: "27300",
    },
    {
      id: 4,
      title: "ПОТОП",
      number: "1564854",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Мамыр-4, дом 138",
      status: 2,
      type: 1,
      paymentType: "1",
      paid: "34700",
    },
    {
      id: 5,
      title: "ПОТОП",
      number: "1564854",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Мамыр-4, дом 138",
      status: 2,
      type: 3,
      paymentType: "1",
      paid: "34700",
    },
    {
      id: 6,
      title: "ПОТОП",
      number: "1564854",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Мамыр-4, дом 138",
      status: 3,
      type: 1,
      paymentType: "1",
      paid: "34700",
    },
  ];

  return (
    <View className="flex-1 pt-2" style={{ position: "relative" }}>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={({ route }) => (
          <RequestsScenes route={route} data={data} openSheet={openSheet} />
        )}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        removeClippedSubviews={false}
        renderTabBar={(props: TabBarProps<any>) => (
          <RequestsTabBar {...props} />
        )}
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        backgroundStyle={{
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 16 }}>
          <Text className="text-lg font-semibold mb-4">Фильтр заявок</Text>

          {[
            { key: "all", label: "Все" },
            { key: "date", label: "По дате" },
            { key: "moved", label: "Перенесённые" },
            { key: "cancelled", label: "Отменённые" },
          ].map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              onPress={() => setFilter(key as any)}
              className="flex-row justify-between items-center mb-3"
            >
              <Text className="text-base">{label}</Text>
              {filter === key ? (
                <View className="w-4 h-4 rounded-full bg-green-600" />
              ) : (
                <View className="w-4 h-4 rounded-full border border-gray-400" />
              )}
            </TouchableOpacity>
          ))}

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={() => setFilter("all")}
              className="border border-gray-400 rounded-xl px-6 py-2"
            >
              <Text className="text-gray-600">Сброс</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeSheet}
              className="bg-green-600 rounded-xl px-6 py-2"
            >
              <Text className="text-white font-semibold">Применить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
