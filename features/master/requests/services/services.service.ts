import { parseServiceError } from "@/services/api/error";
import { apiInstance } from "@/services/api/auth-instance";

export const Services = {
  async getServices() {
    try {
      const { data } = await apiInstance.get(
        "/api/service/smcs/getServiceList",
      );
      return data.data;
    } catch (e) {
      throw e;
    }
  },

  async getPositionSum(
    serviceTypeId: number,
    bukrs: number,
    branchId: number,
    productId: number,
  ) {
    try {
      const { data } = await apiInstance.post(
        "/api/service/smcs/getPositionSum",
        {
          serviceTypeId,
        },
        {
          params: {
            bukrs: bukrs,
            branchId: branchId,
            productId: productId,
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
      const { data } = await apiInstance.post("/api/service/smcs/check", body);
      return data.data;
    } catch (e: any) {
      throw new Error(parseServiceError(e));
    }
  },

  async getServiceApp(appNumber: number) {
    try {
      const { data } = await apiInstance.get(
        "/api/service/smcs/getServiceApplication",
        {
          params: {
            applicationNumber: Number(appNumber),
          },
        },
      );
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  async createPayment(body: any) {
    try {
      const { data } = await apiInstance.post(
        "/api/service/smcs/master/draft/create-and-payment",
        body,
      );
      return data;
    } catch (e: any) {
      throw new Error(parseServiceError(e));
    }
  },
};
