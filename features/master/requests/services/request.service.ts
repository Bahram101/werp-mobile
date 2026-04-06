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
          ...((status === "5" || status === "8") && {
            dateOpenAt: from,
            dateOpenTo: to,
          }),
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

  async updateRequestStatus(reqId: number, statusId: number) {
    try {
      const { data } = await serviceInstance.put("/smecam/edit", {
        applicationStatusId: statusId,
        id: reqId,
        branchId: 61,
        operatorId: 706,
      });
      return data;
    } catch (e) {
      throw e;
    }
  },

  async getRquestPremiumSum(masterId: number, status: string, from?: string) {
    try {
      const { data } = await serviceInstance.get("/report/srlsm", {
        params: {
          bukrs: 1000,
          branchIds: 61,
          serviceStatusId: status,
          masterId: masterId,
          dateAt: from,
        },
      });
      return data.data.listSum;
    } catch (e) {
      throw e;
    }
  },
};
