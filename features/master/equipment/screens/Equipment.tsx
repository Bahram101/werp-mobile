import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import React from "react";
import { useGetAccountibilities } from "../../requests/hooks/useMatnr";
import EquipmentList from "../components/EquipmentList";
import { EquipmentDto } from "../types";

const Equipment = () => {
  const { data, isLoading } = useGetAccountibilities<EquipmentDto[]>();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <EquipmentList data={data[0]?.items || []} />
      <AnimatedButton bg="primary" bgPressed="primaryDark" className="p-4">
        Заказать запчасти
      </AnimatedButton>
    </Layout>
  );
};

export default Equipment;
