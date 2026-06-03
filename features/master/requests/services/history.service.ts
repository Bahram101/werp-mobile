import { apiInstance } from "@/services/api/auth-instance";

export const HistoryService = {
  async getHistoryList(contractNumber: number) {
    try {
      const { data } = await apiInstance.get(
        `/api/service/smcuspor/serviceCrmHistoryService?contractNumber=${contractNumber}`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },

  async getHistory() {},
};
