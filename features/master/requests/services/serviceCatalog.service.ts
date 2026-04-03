import { serviceInstance } from "@/services/api/service-instance";

export const ServiceCatalogService = {
  async getServices() {
    try {
      const { data } = await serviceInstance.get("/smcs/getServiceList");
      return data.data;
    } catch (e) {
      throw e;
    }
  },

  getServicePackages() {},
};
