import { serviceInstance } from "@/services/api/service-instance";

export const MatnrService = {
  async getMatnrList(
    masterId: number,
    bukrs: number,
    branchId: number,
    serviceTypeId: number,
  ) {
    try {
      const { data } = await serviceInstance.get("/smcs/getMatnrPriceList", {
        params: {
          bukrs,
          branchId,
          tovarId: 256,
          masterId,
          serviceTypeId,
        },
      });
      return data.data;
    } catch (e) {
      throw e;
    }
  },
};
