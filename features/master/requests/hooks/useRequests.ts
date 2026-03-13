import { useQuery } from "@tanstack/react-query";
import { RequestService } from "../services/request.service";

export const useRequests = () => {
  const { data: requests = [], isFetching: isLoading } = useQuery({
    queryKey: ["get-master-requests"],
    queryFn: () => RequestService.getMasterRequests(),
    retry: 1,
  });
  return { requests, isLoading };
};
