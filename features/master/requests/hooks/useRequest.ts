import { useAuth } from "@/features/auth/hooks/useAuth";
import { getCurrentMonthStart, getToday } from "@/utils/date";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RequestService } from "../services/request.service";

export const useRequests = (status: string, from?: string, to?: string) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff?.staffId;

  const {
    data: requests = [],
    isFetching: isLoading,
    refetch: refetchRequests,
  } = useQuery({
    queryKey: ["get-master-requests", masterId, status, from, to],
    queryFn: () =>
      RequestService.getMasterRequests(masterId!, status, from, to),
    enabled: !!masterId,
    retry: 1,
    staleTime: 1000 * 30,
  });
  return { requests, isLoading, refetchRequests };
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

export const useAssignedTotalCount = (status: string) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff.staffId;
  const {
    data = [],
    isFetching: isLoading,
    refetch: refetchAssigned,
  } = useQuery({
    queryKey: ["assigned-total", status, masterId],
    queryFn: () => RequestService.getMasterRequests(masterId!, status),
    enabled: !!masterId && !!status,
  });
  return { assignedReqCount: data.length, isLoading, refetchAssigned };
};

export const useDoneTodayCount = (status: string) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff.staffId;
  const today = getToday();

  const { data = [], refetch: refetchDone } = useQuery({
    queryKey: ["done-today", masterId],
    queryFn: () =>
      RequestService.getMasterRequests(masterId!, status, today, today),
  });
  return { doneReqCount: data.length, refetchDone };
};

export const useFinishedMonthCount = (status: string) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff.staffId;
  const from = getCurrentMonthStart();
  const to = getToday();

  const { data = [], refetch: refetchFinished } = useQuery({
    queryKey: ["finished-month", masterId],
    queryFn: () =>
      RequestService.getMasterRequests(masterId!, status, from, to),
  });
  return { finishedReqCount: data.length, refetchFinished };
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
