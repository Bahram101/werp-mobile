import { serviceInstance } from "@/services/api/service-instance";

export const HistoryService = {
  async getHistoryList(contractNumber: number) {
    try {
      const { data } = await serviceInstance.get(
        `/smcuspor/serviceCrmHistoryService?contractNumber=${contractNumber}`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },

  async getHistory() {},
};
