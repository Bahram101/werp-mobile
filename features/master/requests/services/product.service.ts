import { serviceInstance } from "@/services/api/service-instance";

export const MatnrService = {
  async getMatnrList(masterId: number) {
    try {
      const { data } = await serviceInstance.get("/smcs/getMatnrPriceList", {
        params: {
          bukrs: 1000,
          branchId: 61,
          masterId,
          serviceTypeId: 3,
          tovarId: 256,
        },
      });
      return data;
    } catch (e) {
      throw e;
    }
  },
};
