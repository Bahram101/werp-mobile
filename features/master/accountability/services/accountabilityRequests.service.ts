import { apiInstance } from "@/services/api/auth-instance";
import { CreateAccountabilityPayload } from "../types";

export const AccountabilityService = {
  async getAccountabilityRequestsByStatus(
    statusId: number,
    responsibleId?: number,
  ) {
    try {
      const { data } = await apiInstance.get(
        "/api/core/logistics/accountabilities",
        {
          params: { statusId, responsibleId },
        },
      );
      return data;
    } catch (e) {
      throw e;
    }
  },

  async getAccountibilityRequestById(id: number) {
    try {
      const { data } = await apiInstance.get(
        `/api/core/logistics/accountabilities/${id}`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },

  async createAccountability(formData: CreateAccountabilityPayload) {
    try {
      const { data } = await apiInstance.post(
        `/api/core/logistics/accountabilities`,
        formData,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
};
