
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
  type: number,
  paymentType: string;
  paid: string;
}

export interface ClientType {
  name: string
  address: string
  problem: string
}

export type ServiceType = string[]

export interface DeviceType {
  id: string
  product: string
  cn: string
  date: string
}

export interface HistoryItemType {
  id: number
  date: string
}

export type RequestType = {
  client: ClientType
  service: ServiceType
  device: DeviceType
  history: HistoryItemType[]
}