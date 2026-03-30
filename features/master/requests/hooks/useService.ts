import { useQuery } from "@tanstack/react-query";
import { serviceCatalogService } from "../services/serviceCatalog.service";

export const useServices = () => {
  const { data: services = [], isFetching: isLoading } = useQuery({
    queryKey: ["get-services"],
    queryFn: () => serviceCatalogService.getServices(),
  });
  return { services, isLoading };
};
