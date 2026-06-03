import { apiInstance } from "@/services/api/auth-instance";

export const MaterialsService = {
  async getMaterials(werksId: number) {
    try {
      const { data } = await apiInstance.get(
        `/api/core/logistics/matnrs-in-werks/${werksId}/active-matnrs`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
};
