import { serviceInstance } from "@/services/api/service-instance";

export const RequestService = {
  async getMasterRequests(masterId: number) {
    try {
      const { data } = await serviceInstance.get("/smappl/appList", {
        params: {
          appStatusIds: "2,5",
          bukrs: 1000,
          branchIds: 61,
          dateOpenAt: "2025-03-06",
          masterId,
        },
      });
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  async getMasterRequestDetails(reqId: number) {
    try {
      const { data } = await serviceInstance.get(``);
    } catch (error) {}
  },
};
