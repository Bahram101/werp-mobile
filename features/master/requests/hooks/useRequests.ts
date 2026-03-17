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

export const useRequestDetail = (id: number) => {
  const {
    data: requestDetail,
    isPending: isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["get-master-request-details"],
    queryFn: () => RequestService.getMasterRequestDetails(id),
  });

  return { requestDetail: requestDetail?.application, isLoading, isFetching };
};
