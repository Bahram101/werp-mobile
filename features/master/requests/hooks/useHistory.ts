import { useQuery } from "@tanstack/react-query";
import { HistoryService } from "../services/history.service";

export const useHistories = (contractNumber: number) => {
  const { data: historyList = [], isFetching: isLoading } = useQuery({
    queryKey: ["get-request-history"],
    queryFn: () => HistoryService.getHistory(contractNumber),
  });
  return { historyList, isLoading };
};
