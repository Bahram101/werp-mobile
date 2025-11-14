import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

type Props = {};

const RequestWorkScreen = (props: Props) => {

  const navigation = useNavigation()

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: "Работа с заявкой",
    })
  }, [navigation])

  return (
    <View>
      <Text>RequestWorkScreen</Text>
    </View>
  );
};

export default RequestWorkScreen;
