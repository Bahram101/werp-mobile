import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FinanceService } from "../services/finance.service";
import { CashBankResponse } from "../types";

export const useCashBankHkonts = () => {
  const { user } = useAuth();
  const bukrs = user?.userInfo?.bukrs?.[0]?.id;
  const branchId = user?.userInfo?.service?.[bukrs ?? ""]?.[0]?.value;

  const { data: cashBankHkonts = [], isFetching: isLoadingCashBankHkonts } =
    useQuery<CashBankResponse[]>({
      queryKey: ["get-finance-data", bukrs, branchId],
      queryFn: () => FinanceService.getCashBankHkonts(bukrs, branchId),
      enabled: !!bukrs && !!branchId,
    });

  return { cashBankHkonts, isLoadingCashBankHkonts };
};
