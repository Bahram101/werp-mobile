export interface EquipmentDto2 {
  staffId: number;
  staffName: string;
  // items: EquipmentDtoItem[];
}

export type EquipmentDtoItem2 = {
  matnr: number;
  matnrName: string;
  matnrCode: string;
  qty: number;
  barcodes: string[];
};

export type EquipmentDto = {
  matnr: number;
  code: string;
  name: string;
  barcode: string | null;
  quantity: number;
  stateId: number;
  limit: number;
};
