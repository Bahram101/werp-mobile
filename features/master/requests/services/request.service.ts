import { apiInstance } from "@/services/api/auth-instance";
import { getCurrentMonthStart, getToday } from "@/utils/date";

export const RequestService = {
  async getMasterRequests(masterId: number, status: string, bukrs?: number) {
    try {
      const { data } = await apiInstance.get("/api/service/smappl/appList", {
        params: {
          bukrs,
          appStatusIds: status,
          masterId,
          ...((status === "5" || status === "8") && {
            dateOpenAt: status === "5" ? getCurrentMonthStart() : getToday(),
            dateOpenTo: getToday(),
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
      const { data } = await apiInstance.get(`/api/service/smecam-ma/${reqId}`);
      return data.data.application;
    } catch (error) {
      throw error;
    }
  },

  async getMastersDoneRequests(masterId: number) {
    try {
      const { data } = await apiInstance.get(
        "/api/service/smcs/master/draft/my-list",
        {
          params: {
            masterId,
          },
        },
      );
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  async getMasterDoneRequestDetail(id: number) {
    try {
      const { data } = await apiInstance.get(
        `/api/service/smcs/master/draft/${id}`,
      );
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  async updateRequestStatus(reqId: number, statusId: number) {
    try {
      const { data } = await apiInstance.put(
        "/api/service/smecam-ma-status-update",
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

  async getFinishedRequests(
    bukrs: string,
    status: string,
    masterId: number,
    from: string,
  ) {
    try {
      const { data } = await apiInstance.get("/api/service/smappl/appList", {
        params: {
          bukrs,
          appStatusIds: status,
          masterId,
          dateOpenAt: "2026-05-01",
        },
      });
      return data.data;
    } catch (e) {
      throw e;
    }
  },
};
