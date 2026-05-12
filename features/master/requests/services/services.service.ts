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

  async getPositionSum(
    serviceTypeId: number,
    bukrs: number,
    branchId: number,
    productId: number,
  ) {
    try {
      console.log("serviveTypeId", serviceTypeId);
      const { data } = await serviceInstance.post(
        "/smcs/getPositionSum",
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
        "/smcs/master/draft/create-and-payment",
        body,
      );
      return data;
    } catch (e: any) {
      const raw = e.response?.data?.response;

      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          throw new Error(parsed.message);
        } catch {
          throw new Error("Ошибка сервера");
        }
      }

      throw new Error(e.response?.data?.message || "Ошибка сервера");
    }
  },
};
