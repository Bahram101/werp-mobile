import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { MatnrService } from "../services/product.service";

export const useMatnr = (serviceTypeId: number) => {
  const { user } = useAuth();
  const masterId = user?.currentStaff?.staffId;
  const { data: matnrList = [], isLoading } = useQuery({
    queryKey: ["get-matnr-list"],
    queryFn: () => MatnrService.getMatnrList(masterId, serviceTypeId),
    staleTime: 1000 * 60 * 60,
  });
  return { matnrList, isLoading };
};
