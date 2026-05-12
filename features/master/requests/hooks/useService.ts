import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Services } from "../services/services.service";
import { ServiceItem } from "../types";

export const useServices = () => {
  const { data: services = [], isFetching: isLoading } = useQuery<
    ServiceItem[]
  >({
    queryKey: ["get-services"],
    queryFn: () => Services.getServices(),
    retry: 1,
  });
  return { services, isLoading };
};

export const usePositioniSum = (id?: number, matnrId?: number) => {
  const { user } = useAuth();
  const bukrs = user?.userInfo?.bukrs?.[0]?.id;
  const branchId = user?.userInfo?.service?.[bukrs ?? ""]?.[0]?.value;

  const { data: positionSum = {}, isFetching: isLoading } = useQuery({
    queryKey: ["get-position-sum", id],
    queryFn: () => Services.getPositionSum(id!, bukrs!, branchId!, matnrId!),
    retry: 1,
    enabled: !!id,
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
    retry: false,
  });

  return { checkServiceAsync, resCheckServices, isLoading };
};

export const useServiceApplication = (id?: number) => {
  const { data: serviceApplication = {}, isFetching: isLoadingServiceApp } =
    useQuery({
      queryKey: ["get-service-application", id],
      queryFn: () => Services.getServiceApp(id!),
      retry: 1,
      enabled: !!id,
    });
  return { serviceApplication, isLoadingServiceApp };
};

export const useCreatePayment = () => {
  const { mutateAsync: createPaymentAsync, isPending: isPaymentLoading } =
    useMutation({
      mutationKey: ["create-payment"],
      mutationFn: (body: any) => Services.createPayment(body),
      retry: false,
    });

  return { createPaymentAsync, isPaymentLoading };
};
