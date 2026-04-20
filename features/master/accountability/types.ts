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
};
export type SelectedMaterialItem = MaterialDto & {
  selectedQty: number;
};
