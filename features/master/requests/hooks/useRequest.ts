import { useAuth } from "@/features/auth/hooks/useAuth";
import { getCurrentMonthStart } from "@/utils/date";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RequestService } from "../services/request.service";

export const useRequests = (status: string, from?: string, to?: string) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff?.staffId;

  const {
    data: requests = [],
    isLoading: isLoadingRequests,
    // refetch: refetchRequests,
    refetch,
  } = useQuery({
    queryKey: ["get-master-requests", masterId, status, from, to],
    queryFn: () =>
      RequestService.getMasterRequests(masterId!, status, from, to),
    enabled: !!masterId,
    retry: 1,
    staleTime: 1000 * 30,
  });
  return { requests, isLoadingRequests, refetch };
};

export const useRequestDetail = (id: number) => {
  const {
    data: requestDetail,
    isLoading: isLoadingReqDetail,
    refetch: refetchRequestDetail,
  } = useQuery({
    queryKey: ["get-master-request-details", id],
    queryFn: () => RequestService.getMasterRequestDetail(id),
    staleTime: 1000 * 60 * 5,
  });

  return {
    requestDetail: requestDetail?.application,
    isLoadingReqDetail,
    refetchRequestDetail,
  };
};

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();
  const { mutate: updateRequestStatus, isPending: isLoading } = useMutation({
    mutationKey: ["update-request-status"],
    mutationFn: ({ reqId, statusId }: { reqId: number; statusId: number }) =>
      RequestService.updateRequestStatus(reqId, statusId),
    retry: false,

    onSuccess: ({ data: { application } }) => {
      queryClient.setQueryData(
        ["get-master-request-details", application.applicationNumber],
        (old: any) => ({
          ...old,
          application: {
            ...old.application,
            applicationStatusId: application.applicationStatusId,
          },
        }),
      );
      queryClient.invalidateQueries({
        queryKey: ["get-master-requests"],
      });
    },
  });
  return { updateRequestStatus, isLoading };
};

export const useFinishedSummary = ({ enabled }: { enabled: boolean }) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff.staffId;
  const from = getCurrentMonthStart();

  const {
    data = [],
    refetch: refetchSummary,
    isLoading,
  } = useQuery({
    queryKey: ["finished-summary", masterId],
    queryFn: () => RequestService.getRquestPremiumSum(masterId!, "4", from),
    enabled,
  });

  return { finishedSummaryData: data, refetchSummary, isLoading };
};
