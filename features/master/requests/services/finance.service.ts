import { coreInstance } from "@/services/api/core-instance";
import { CashBankResponse } from "../types";

export const FinanceService = {
  async getCashBankHkonts(bukrs: number, branchId: number) {
    try {
      const { data } = await coreInstance.get<{
        hkontOptions: CashBankResponse[];
      }>(`/finance/mainoperation/fetchCashBankHkontsByBranch`, {
        params: { brnch: branchId, bukrs },
      });
      return data.hkontOptions;
    } catch (e) {
      throw e;
    }
  },
};
