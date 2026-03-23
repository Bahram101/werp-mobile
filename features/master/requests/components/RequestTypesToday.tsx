import { Loader } from "@/components/ui/Loader";
import React, { FC } from "react";
import { View } from "react-native";
import RequestTypeItem from "./RequestTypeItem";

interface IRequestList {
  requests: any[];
  isLoading: boolean;
}

const RequestTypesToday: FC<IRequestList> = ({ requests, isLoading }) => {
  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : (
        requests.map((request: any) => (
          <RequestTypeItem key={request.id} request={request} />
        ))
      )}
    </View>
  );
};
export default RequestTypesToday;
