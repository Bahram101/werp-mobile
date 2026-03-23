import { serviceInstance } from "@/services/api/service-instance";

export const RequestService = {
  async getMasterRequests(masterId: number, today: string, status: string) {
    try {
      const { data } = await serviceInstance.get("/smappl/appList", {
        params: {
          bukrs: 1000,
          branchIds: 61,
          appStatusIds: status,
          dateOpenAt: today,
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
      const { data } = await serviceInstance.get(`/smecam/${reqId}`);
      return data.data;
    } catch (error) {
      throw error;
    }
  },
};
