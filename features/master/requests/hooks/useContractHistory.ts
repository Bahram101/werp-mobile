import { useQuery } from "@tanstack/react-query";
import { HistoryService } from "../services/history.service";

export const useContractHistory = (contractNumber: number) => {
  const { data: history = [], isFetching: isLoading } = useQuery({
    queryKey: ["get-request-history"],
    queryFn: () => HistoryService.getHistory(contractNumber),
  });
  return { history, isLoading };
};
