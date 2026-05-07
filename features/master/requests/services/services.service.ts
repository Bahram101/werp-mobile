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
    } catch (e: any) {
      const raw = e.response?.data?.response;
      if (raw) {
        const { message } = JSON.parse(raw);
        throw new Error(message);
      }

      throw new Error(e.response?.data?.message || "Ошибка сервера");
    }
  },

  async getServiceApp(appNumber: number) {
    try {
      const { data } = await serviceInstance.get(
        "/smcs/getServiceApplication",
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
      const { data } = await serviceInstance.post(
        "/smcs/master/draft/create-payment",
        body,
      );
      return data;
    } catch (e: any) {
      const raw = e.response?.data?.response;
      if (raw) {
        const { message } = JSON.parse(raw);
        throw new Error(message);
      }

      throw new Error(e.response?.data?.message || "Ошибка сервера");
    }
  },
};
