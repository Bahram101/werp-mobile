import { apiInstance } from "@/services/api/auth-instance";

export const MatnrService = {
  async getMatnrList(
    masterId: number,
    bukrs: number,
    branchId: number,
    serviceTypeId: number,
  ) {
    try {
      const { data } = await apiInstance.get(
        "/api/service/smcs/getMatnrPriceList",
        {
          params: {
            bukrs,
            branchId,
            tovarId: 256,
            masterId,
            serviceTypeId,
          },
        },
      );
      return data.data;
    } catch (e) {
      throw e;
    }
  },
};
