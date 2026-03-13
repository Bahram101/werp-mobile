import { serviceInstance } from "@/services/api/service-instance";

export const RequestService = {
  async getMasterRequests() {
    const { data } = await serviceInstance.get("/smappl/appList", {
      params: {
        appStatusIds: [1, 2],
        bukrs: 1000,
        dateOpenAt: "2025-03-06",
        masterId: 806,
      },
    });
    return data;
  },
};
