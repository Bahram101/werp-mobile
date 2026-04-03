import { useQuery } from "@tanstack/react-query";
import { HistoryService } from "../services/history.service";

export const useHistories = (contractNumber: number) => {
  const { data: historyList = [], isFetching: isLoading } = useQuery({
    queryKey: ["get-request-history", contractNumber],
    queryFn: () => HistoryService.getHistoryList(contractNumber),
    staleTime: 1000 * 60 * 5,
  });
  return { historyList, isLoading };
};
