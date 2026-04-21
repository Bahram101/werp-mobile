export type AssignedMaterialDto = {
  matnr: number;
  code: string;
  name: string;
  barcode: string | null;
  quantity: number;
  stateId: number;
  limit: number;
};

export type MaterialDto = {
  code: string;
  matnr: number;
  matnrName: string;
  quantity: number;
  availableQty: number;
};
// export type SelectedMaterialItem = MaterialDto & {
//   quantity: number;
// };

export type AccountabilityFormData = {
  branchId: number;
  bukrs: string;
  customerId?: number | null;
  departmentId: number;
  invoiceDate: string;
  note?: string;
  responsibleId: number | null;
  fromWerks: number;
  toWerks: number | null;
  typeId?: number | null;
};

export type CreateAccountabilityPayload = AccountabilityFormData & {
  items: MaterialDto[];
};
