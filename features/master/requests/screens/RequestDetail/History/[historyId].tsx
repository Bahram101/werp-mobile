import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const HistoryDetailScreen = () => {
  const navigation = useNavigation();
  const { appNumber, historyId } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `История`,
    });
  }, [navigation]);

  console.log("HistoryDetailScreen", appNumber, historyId);

  return (
    <View>
      <Text>HistoryDetailScreen</Text>
    </View>
  );
};

export default HistoryDetailScreen;
