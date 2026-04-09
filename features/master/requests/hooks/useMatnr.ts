import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { MatnrService } from "../services/product.service";

export const useMatnr = () => {
  const { user } = useAuth();
  const masterId = user?.currentStaff?.staffId;
  const { data: matnrList = [], isLoading: isMatnrLoading } = useQuery({
    queryKey: ["get-matnr-list"],
    queryFn: () => MatnrService.getMatnrList(masterId),
    staleTime: 1000 * 60 * 60,
  });
  return { matnrList, isMatnrLoading };
};
