import Layout from "@/components/ui/master/Layout";
import { IDepartment } from "@/types/department.interface";
import React from "react";
import MessageList from "../components/MessageList";

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
    <Layout>
      <MessageList data={departments} />
    </Layout>
  );
}
