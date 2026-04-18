import Layout from "@/components/ui/master/Layout";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import Materials from "./components/Materials";

const CreateAccountabilityRequest = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Создание заявки`,
    });
  }, [navigation]);

  return (
    <Layout>
      <View className="request-work flex-1">
        <Materials data={[]} />
      </View>
    </Layout>
  );
};

export default CreateAccountabilityRequest;
