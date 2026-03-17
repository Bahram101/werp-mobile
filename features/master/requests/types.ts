export interface IRequestType {
  id: string;
  title: string;
  number: number;
  date: string;
  address: string;
  category: string;
  timeFrom: string;
  timeTo: string;
  scheme: string;
  icon: string;
}
export interface IRequest {
  id: number;
  title: string;
  number: string;
  date: string;
  address: string;
  time: string;
  status: number;
  type: number;
  paymentType: string;
  paid: string;
  applicationStatusId: number;
  applicationNumber: number;
  applicationTypeName: string;
  applicationDate: string;
  fullAddress: string;
}

export interface ClientType {
  name: string;
  address: string;
}

export type ServiceType = {
  type: string;
};

export interface DeviceType {
  id: string;
  productName: string;
  contractNumber: string;
  contractDate: string;
  filterState: {
    f1: number;
    f2: number;
    f3: number;
    f4: number;
    f5: number;
  };
}

export interface HistoryItemType {
  id: number;
  date: string;
}

export type RequestType = {
  client: ClientType;
  service: ServiceType;
  device: DeviceType;
  history: HistoryItemType[];
};

export type ServiceItem = {
  id: number;
  name: string;
  price: number;
  currency: string;
};

export type SparePartItem = {
  id: number;
  name: string;
  price: number;
  serialNumber: string;
  quantity: number;
};
