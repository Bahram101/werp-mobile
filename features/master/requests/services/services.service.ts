import { serviceInstance } from "@/services/api/service-instance";

export const Services = {
  async getServices() {
    try {
      const { data } = await serviceInstance.get("/smcs/getServiceList");
      return data.data;
    } catch (e) {
      throw e;
    }
  },

  async getPositionSum(serviceTypeId: number) {
    try {
      const { data } = await serviceInstance.post(
        "/smcs/getPositionSum",
        {
          serviceTypeId,
        },
        {
          params: {
            bukrs: 1000,
            branchId: 61,
            productId: 812,
          },
        },
      );
      return data.data;
    } catch (e) {
      throw e;
    }
  },

  async checkService(body: any) {
    try {
      const { data } = await serviceInstance.post("/smcs/check", body);
      return data.data;
    } catch (e) {
      throw e;
    }
  },
};
