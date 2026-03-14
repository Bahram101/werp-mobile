import { serviceInstance } from "@/services/api/service-instance";

export const RequestService = {
  async getMasterRequests(masterId: number) {
    try {
      const ddd = await serviceInstance.get("/smappl/appList", {
        params: {
          appStatusIds: [2],
          bukrs: 1000,
          branchIds: 61,
          dateOpenAt: "2025-03-06",
          masterId,
        },
      });
      // const res = await serviceInstance.get(
      //   "/smappl/appList?appStatusIds=2&bukrs=1000&dateOpenAt=2025-03-06&masterId=1901",
      // );
      console.log("getMasterRequests", ddd.data);
    } catch (error) {
      console.log("REQUEST ERROR", error);
      console.log("ERROR RESPONSE", error?.response?.data.message);
      // console.log("ERROR STATUS", error?.response?.status);
      throw error;
    }

    // console.log("getMasterRequests", ddd);
    // return ddd;
  },
};
