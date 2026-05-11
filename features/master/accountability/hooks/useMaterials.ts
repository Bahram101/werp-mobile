import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { MaterialsService } from "../services/materials.service";

export const useMaterials = () => {
  const { user } = useAuth();
  const werksId = user?.userInfo?.werks?.[0]?.werksId;

  const { data = [], isLoading } = useQuery({
    queryKey: ["get-materials", werksId],
    queryFn: () => MaterialsService.getMaterials(werksId),
    enabled: !!werksId,
    retry: false,
  });
  return { data, isLoading };
};
