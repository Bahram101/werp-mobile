import coreInstance from "@/services/api/interceptors";
import { CreateAccountabilityPayload } from "../types";

export const AccountabilityService = {
  async getAccountabilityRequestsByStatus(
    statusId: number,
    responsibleId?: number,
  ) {
    try {
      const { data } = await coreInstance.get("/logistics/accountabilities", {
        params: { statusId, responsibleId },
      });
      return data;
    } catch (e) {
      throw e;
    }
  },

  async getAccountibilityRequestById(id: number) {
    try {
      const { data } = await coreInstance.get(
        `/logistics/accountabilities/${id}`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },

  async createAccountability(formData: CreateAccountabilityPayload) {
    try {
      const { data } = await coreInstance.post(
        `/logistics/accountabilities`,
        formData,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
};
