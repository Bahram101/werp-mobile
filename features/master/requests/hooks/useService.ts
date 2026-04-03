import { useQuery } from "@tanstack/react-query";
import { ServiceCatalogService } from "../services/serviceCatalog.service";
import { ServiceItem } from "../types";

export const useServices = () => {
  const { data: services = [], isFetching: isLoading } = useQuery<
    ServiceItem[]
  >({
    queryKey: ["get-services"],
    queryFn: () => ServiceCatalogService.getServices(),
  });
  return { services, isLoading };
};
