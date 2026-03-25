import { serviceInstance } from "@/services/api/service-instance";

export const RequestService = {
  async getMasterRequests(
    masterId: number,
    status: string,
    from?: string,
    to?: string,
  ) {
    try {
      const { data } = await serviceInstance.get("/smappl/appList", {
        params: {
          bukrs: 1000,
          branchIds: 61,
          appStatusIds: status,
          masterId,
          dateOpenAt: status === "5" ? from : null,
          dateOpenTo: status === "5" ? to : null,
        },
      });
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  async getMasterRequestDetail(reqId: number) {
    try {
      const { data } = await serviceInstance.get(`/smecam/${reqId}`);
      return data.data;
    } catch (error) {
      throw error;
    }
  },
};
