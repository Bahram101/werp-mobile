
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
  paymentType: string;
  paid: string;
}
export type RequestDetailParams = {
  id: string;
  number?: string;
};