import { Loader } from "@/components/ui/Loader";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDoneRequestDetail } from "../../hooks/useRequest";

type DoneRequestParams = {
  id: string;
};

const RequestDetailScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<DoneRequestParams>();

  const { doneRequestDetail, isLoadingDoneReqDetail } = useDoneRequestDetail(
    Number(id),
  );

  useEffect(() => {
    if (doneRequestDetail?.applicationNumber) {
      navigation.setOptions({
        title: `Заявка №${doneRequestDetail.applicationNumber}`,
      });
    }
  }, [navigation, doneRequestDetail]);

  if (isLoadingDoneReqDetail) {
    return <Loader />;
  }

  // console.log("id", id);
  // console.log("doneRequestDetail", doneRequestDetail);

  return (
    <View>
      <Text>RequestDetailScreen</Text>
    </View>
  );
};

export default RequestDetailScreen;
