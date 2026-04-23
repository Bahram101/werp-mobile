import { useQuery } from "@tanstack/react-query";
import { ServiceCatalog } from "../services/serviceCatalog.service";
import { ServiceItem } from "../types";

export const useServices = () => {
  const { data: services = [], isFetching: isLoading } = useQuery<
    ServiceItem[]
  >({
    queryKey: ["get-services"],
    queryFn: () => ServiceCatalog.getServices(),
  });
  return { services, isLoading };
};

export const usePositioniSum = (id?: number) => {
  const { data: positionSum = {}, isFetching: isLoading } = useQuery({
    queryKey: ["get-position-sum", id],
    queryFn: () => ServiceCatalog.getPositionSum(id!),
    enabled: !!id,
    retry: false,
  });
  return { positionSum, isLoading };
};
