export type AssignedMaterialDto = {
  matnr: number;
  code: string;
  name: string;
  barcode: string | null;
  quantity: number;
  stateId: number;
  limit: number;
};
