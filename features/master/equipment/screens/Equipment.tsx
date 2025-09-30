import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Layout from "@/components/ui/master/Layout";
import React from "react";
import EquipmentList from "../components/EquipmentList";

const Equipment = () => {
  const equipments = [
    {
      id: 1,
      name: "ПОМПА",
      qty: "7",
    },
    {
      id: 2,
      name: "Кран чистой воды",
      qty: "13",
    },
    {
      id: 3,
      name: "Бак накопительный",
      qty: "4",
    },
    {
      id: 4,
      name: "Мембрана",
      qty: "28",
    },
    {
      id: 5,
      name: "Соединения и фитинги",
      qty: "1",
    },
    {
      id: 6,
      name: "Ключи для колб",
      qty: "67",
    },
    {
      id: 7,
      name: "Сливной хомут",
      qty: "34",
    },
    {
      id: 8,
      name: "Соединения и фитинги",
      qty: "1",
    },
    {
      id: 9,
      name: "Ключи для колб",
      qty: "67",
    },
    {
      id: 10,
      name: "Сливной хомут",
      qty: "34",
    },
  ];

  return (
    <Layout>
      <EquipmentList data={equipments} />
      <AnimatedButton bg="primary" bgPressed="primaryDark">
        Заказать запчасти
      </AnimatedButton> 
    </Layout>
  );
};

export default Equipment;
