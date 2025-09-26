import React, { FC } from "react";
import { View } from "react-native";
import { IRequest } from "../types";
import RequestItem from "./RequestItem";

interface IRequestList {
  requests: IRequest[];
}

const RequestList: FC<IRequestList> = ({ requests }) => {
  return (
    <View>
      {requests.map((request: IRequest) => (
        <RequestItem key={request.id} request={request} />
      ))}
    </View>
  );
};
export default RequestList;
