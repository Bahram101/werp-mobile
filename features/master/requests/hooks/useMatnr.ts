import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { MatnrService } from "../services/product.service";

export const useMatnr = (serviceTypeId: number) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff?.staffId;
  const { data = [], isLoading } = useQuery({
    queryKey: ["get-matnr-list", masterId, serviceTypeId],
    queryFn: () => MatnrService.getMatnrList(masterId, serviceTypeId),
    staleTime: 1000 * 60 * 60,
  });
  return { data, isLoading };
};

export const useGetAccountibilities = <T = unknown>() => {
  const { user } = useAuth();
  const masterId = user?.currentStaff?.staffId;
  const {
    data = [],
    isLoading,
    refetch: refetchAccountibilities,
  } = useQuery<T>({
    queryKey: ["get-accountibilities", masterId],
    queryFn: () => MatnrService.getAccountibilities(masterId, 3),
    enabled: !!masterId,
    staleTime: 1000 * 60 * 60,
  });
  return { data, isLoading, refetchAccountibilities };
};

export const useGetAccountibilitiesStatuses = <T = unknown>(
  statusId: number,
) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff?.staffId;
  const {
    data: statusesData = [],
    isLoading: isStatusesLoading,
    refetch: refetchStatuses,
  } = useQuery<T>({
    queryKey: ["get-accountibilities-statuses", statusId],
    queryFn: () => MatnrService.getAccountibilitiesStatuses(statusId, masterId),
    enabled: !!statusId,
    staleTime: 1000 * 60 * 60,
  });
  return { statusesData, isStatusesLoading, refetchStatuses };
};
