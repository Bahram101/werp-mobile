import { useQuery } from "@tanstack/react-query";
import { ServiceCatalogService } from "../services/serviceCatalog.service";

export const useServices = () => {
  const { data: services = [], isFetching: isLoading } = useQuery({
    queryKey: ["get-services"],
    queryFn: () => ServiceCatalogService.getServices(),
  });
  return { services, isLoading };
};
