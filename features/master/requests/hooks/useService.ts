import { useMutation, useQuery } from "@tanstack/react-query";
import { Services } from "../services/services.service";
import { ServiceItem } from "../types";

export const useServices = () => {
  const { data: services = [], isFetching: isLoading } = useQuery<
    ServiceItem[]
  >({
    queryKey: ["get-services"],
    queryFn: () => Services.getServices(),
  });
  return { services, isLoading };
};

export const usePositioniSum = (id?: number) => {
  const { data: positionSum = {}, isFetching: isLoading } = useQuery({
    queryKey: ["get-position-sum", id],
    queryFn: () => Services.getPositionSum(id!),
    enabled: !!id,
    retry: false,
  });
  return { positionSum, isLoading };
};

export const useCheckServices = () => {
  const {
    mutate: checkService,
    data: resCheckServices,
    isPending: isLoading,
  } = useMutation({
    mutationFn: (body: any) => Services.checkService(body),
  });

  return { checkService, resCheckServices, isLoading };
};
