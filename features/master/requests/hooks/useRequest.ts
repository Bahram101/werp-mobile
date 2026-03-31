import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { RequestService } from "../services/request.service";

export const useRequests = () => {
  const { user } = useAuth();
  const masterId = user?.currentStaff?.staffId;
  const status = "2";

  const {
    data: requests = [],
    isFetching: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-master-requests"],
    queryFn: () => RequestService.getMasterRequests(masterId!, status),
    enabled: !!masterId,
    retry: 1,
  });
  return { requests, isLoading, refetch };
};

export const useRequestDetail = (id: number) => {
  const {
    data: requestDetail,
    isPending: isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["get-master-request-details", id],
    queryFn: () => RequestService.getMasterRequestDetail(id),
    staleTime: 1000 * 60 * 5,
  });

  return { requestDetail: requestDetail?.application, isLoading, isFetching };
};

export const useRequestsCount = (status: string) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff.staffId;

  const {
    data = [],
    isFetching: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requests-count", status, masterId],
    queryFn: () => RequestService.getMasterRequests(masterId!, "2"),
    enabled: !!masterId,
  });
  return { count: data.length, isLoading, refetch };
};

export const useDoneTodayCount = () => {
  const { user } = useAuth();
  const masterId = user?.currentStaff.staffId;
  const today = new Date().toISOString().split("T")[0];

  const {
    data = [],
    isFetching: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["done-today", masterId],
    queryFn: () =>
      RequestService.getMasterRequests(masterId!, "8", today, today),
  });
  return { count: data.length, isLoading, refetch };
};

export const useFinishedMonthCount = () => {
  const { user } = useAuth();
  const masterId = user?.currentStaff.staffId;

  const today = new Date();
  const from = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const to = today.toISOString().split("T")[0];

  const {
    data = [],
    isFetching: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["finished-month", masterId],
    queryFn: () => RequestService.getMasterRequests(masterId!, "5", from, to),
  });
  return { count: data.length, isLoading, refetch };
};
