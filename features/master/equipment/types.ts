export interface EquipmentDto {
  staffId: number;
  staffName: string;
  items: EquipmentDtoItem[];
}

export type EquipmentDtoItem = {
  matnr: number;
  matnrName: string;
  matnrCode: string;
  qty: number;
  barcodes: string[];
};
