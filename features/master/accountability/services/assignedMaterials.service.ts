import { apiInstance } from "@/services/api/auth-instance";

export const AssignedMaterialsService = {
  async getAssignedMaterials(masterId: number, werks: number) {
    try {
      const { data } = await apiInstance.get(
        `/api/core/logistics/accountabilities/staff-matnrs/${masterId}`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
};
