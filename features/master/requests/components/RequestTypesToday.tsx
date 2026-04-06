import { Loader } from "@/components/ui/Loader";
import React, { FC } from "react";
import { View } from "react-native";
import RequestTypeItem from "./RequestTypeItem";

interface IRequestList {
  requests: any[];
  isLoadingRequests: boolean;
}

const RequestTypesToday: FC<IRequestList> = ({
  requests,
  isLoadingRequests,
}) => {
  console.log("isLoadingRequests", isLoadingRequests);
  return (
    <View>
      {isLoadingRequests ? (
        <Loader />
      ) : (
        requests.map((req: any) => (
          <RequestTypeItem key={req.id} request={req} />
        ))
      )}
    </View>
  );
};
export default RequestTypesToday;
