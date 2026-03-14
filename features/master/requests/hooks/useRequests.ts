import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { RequestService } from "../services/request.service";

export const useRequests = () => {
  const { user } = useAuth();

  const masterId = user?.currentStaff?.staffId;

  const { data: requests = [], isFetching: isLoading } = useQuery({
    queryKey: ["get-master-requests"],
    queryFn: () => RequestService.getMasterRequests(masterId!),
    enabled: !!masterId,
    retry: 1,
  });
  return { requests, isLoading };
};
