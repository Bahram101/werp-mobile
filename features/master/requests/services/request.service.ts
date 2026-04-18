import { serviceInstance } from "@/services/api/service-instance";
import { getCurrentMonthStart, getToday } from "@/utils/date";

export const RequestService = {
  async getMasterRequests(masterId: number, status: string, bukrs?: number) {
    try {
      const { data } = await serviceInstance.get("/smappl/appList", {
        params: {
          bukrs,
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
    } catch (e: any) {
      const raw = e.response?.data?.response;
      if (raw) {
        const { message } = JSON.parse(raw);
        throw new Error(message);
      }

      throw new Error(e.response?.data?.message || "Ошибка сервера");
    }
  },

  async getRquestPremiumSum(
    status: string,
    from: string,
    masterId: number,
    bukrs: number,
  ) {
    try {
      const { data } = await serviceInstance.get("/report/srlsm", {
        params: {
          serviceStatusId: status,
          dateAt: from,
          masterId,
          bukrs,
        },
      });
      return data.data;
    } catch (e) {
      throw e;
    }
  },
};
