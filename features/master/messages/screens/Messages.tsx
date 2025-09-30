import { COLORS } from "@/constants/theme";
import { IDepartment } from "@/types/department.interface";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Messages() {
  const departments: IDepartment[] = [
    {
      id: "1",
      name: "Сервис",
      date: "Сегодня",
      desc: "Описание уведомлении",
      icon: "settings",
    },
    {
      id: "2",
      name: "Финансы",
      date: "Сегодня",
      desc: "Описание уведомлении",
      icon: "dollar-sign",
    },
    {
      id: "3",
      name: "Бухгалтерия",
      date: "17 август",
      desc: "Описание уведомлении",
      icon: "trending-up",
    },
    {
      id: "4",
      name: "Hr",
      date: "16 август",
      desc: "Описание уведомлении",
      icon: "user",
    },
    {
      id: "5",
      name: "Администрация",
      date: "15 август",
      desc: "Описание уведомлении",
      icon: "monitor",
    },
    {
      id: "6",
      name: "Маркетинг",
      date: "8 август",
      desc: "Описание уведомлении",
      icon: "bar-chart",
    },
    {
      id: "7",
      name: "Crm",
      date: "5 август",
      desc: "Описание уведомлении",
      icon: "credit-card",
    },
    {
      id: "8",
      name: "Call-center",
      date: "4 август",
      desc: "Описание уведомлении",
      icon: "headphones",
    },
    {
      id: "9",
      name: "Логистика",
      date: "1 август",
      desc: "Описание уведомлении",
      icon: "truck",
    },
  ];

  return (
    <View className="h-full px-4">
      <ScrollView>
        {departments.map((msg) => (
          <Link
            key={msg.id}
            href={{
              pathname: "/messages/[id]",
              params: { id: msg.id, title: msg.name },
            }}
            asChild
          >
            <TouchableOpacity className="flex-row p-4 bg-white mt-3 justify-between items-center">
              <View className="flex-row items-center gap-4">
                <Feather
                  name={msg.icon}
                  size={30}
                  style={{ color: COLORS.primary }}
                />
                <View className="flex-col ml-4">
                  <Text className="text-lg text-primary mb-1">
                    {msg.name.toUpperCase()}
                  </Text>
                  <Text className="text-xs text-grayDark">
                    Описание уведомлении
                  </Text>
                </View>
              </View>
              <Text className="text-sm ">{msg.date}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}
