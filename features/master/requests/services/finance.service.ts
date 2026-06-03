import { apiInstance } from "@/services/api/auth-instance";
import { CashBankResponse } from "../types";

export const FinanceService = {
  async getCashBankHkonts(bukrs: number, branchId: number) {
    try {
      const { data } = await apiInstance.get<{
        hkontOptions: CashBankResponse[];
      }>(`/api/core/finance/mainoperation/fetchCashBankHkontsByBranch`, {
        params: { brnch: branchId, bukrs },
      });
      return data.hkontOptions;
    } catch (e) {
      throw e;
    }
  },
};
