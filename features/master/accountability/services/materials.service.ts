import { coreInstance } from "@/services/api/core-instance";

export const MaterialsService = {
  async getMaterials(werksId: number) {
    try {
      const { data } = await coreInstance.get(
        `/logistics/matnrs-in-werks/${werksId}/active-matnrs`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
};
