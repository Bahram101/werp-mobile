import { serviceInstance } from "@/services/api/service-instance";
import { getCurrentMonthStart, getToday } from "@/utils/date";

export const RequestService = {
  async getMasterRequests(masterId: number, status: string) {
    try {
      const { data } = await serviceInstance.get("/smappl/appList", {
        params: {
          bukrs: 1000,
          appStatusIds: status,
          masterId,
          ...((status === "5" || status === "8") && {
            dateOpenAt: status === "5" ? getCurrentMonthStart() : getToday(),
            dateOpenTo: status === "5" ? getToday() : getToday(),
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
      const { data } = await serviceInstance.get(`/smecam-ma/${reqId}`);
      return data.data.application;
    } catch (error) {
      throw error;
    }
  },

  async updateRequestStatus(reqId: number, statusId: number) {
    try {
      const { data } = await serviceInstance.put(
        "/smecam-ma-status-update",
        {},
        {
          params: {
            id: reqId,
            statusId: statusId,
          },
        },
      );
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
          serviceStatusId: status,
          masterId: masterId,
          dateAt: from,
        },
      });
      return data.data;
    } catch (e) {
      throw e;
    }
  },
};
