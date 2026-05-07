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
    mutateAsync: checkServiceAsync,
    data: resCheckServices,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["check-service"],
    mutationFn: (body: any) => Services.checkService(body),
  });

  return { checkServiceAsync, resCheckServices, isLoading };
};

export const useServiceApplication = (id?: number) => {
  const { data: serviceApplication = {}, isFetching: isLoadingServiceApp } =
    useQuery({
      queryKey: ["get-service-application", id],
      queryFn: () => Services.getServiceApp(id!),
      enabled: !!id,
      retry: false,
    });
  return { serviceApplication, isLoadingServiceApp };
};

export const useCreatePayment = () => {
  const { mutateAsync: createPaymentAsync, isPending: isLoading } = useMutation(
    {
      mutationKey: ["create-payment"],
      mutationFn: (body: any) => Services.createPayment(body),
      retry: false,
    },
  );

  return { createPaymentAsync, isLoading };
};
