import { coreInstance } from "@/services/api/core-instance";
import { serviceInstance } from "@/services/api/service-instance";

export const MatnrService = {
  async getMatnrList(masterId: number, serviceTypeId: number) {
    try {
      const { data } = await serviceInstance.get("/smcs/getMatnrPriceList", {
        params: {
          bukrs: 1000,
          branchId: 61,
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

  async getAccountibilities(masterId: number, werks: number) {
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
