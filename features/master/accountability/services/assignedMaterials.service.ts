import { coreInstance } from "@/services/api/core-instance";

export const AssignedMaterialsService = {
  async getAssignedMaterials(masterId: number, werks: number) {
    try {
      const { data } = await coreInstance.get(
        `/logistics/accountabilities/staff-matnrs/${masterId}`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
};
