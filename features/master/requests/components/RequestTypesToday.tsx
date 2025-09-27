import React, { FC } from "react";
import { View } from "react-native";
import { IRequestType } from "../types";
import RequestTypeItem from "./RequestTypeItem";

interface IRequestList {
  requests: IRequestType[];
}

const RequestTypesToday: FC<IRequestList> = ({ requests }) => {
  return (
    <View>
      {requests.map((request: IRequestType) => (
        <RequestTypeItem key={request.id} request={request} />
      ))}
    </View>
  );
};
export default RequestTypesToday;
