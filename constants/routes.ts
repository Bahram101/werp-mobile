export const ROUTES = {
  REQUESTS: "/(apps)/master/(tabs)/requests",
  REQUEST: "/(apps)/master/(tabs)/requests/[appNumber]",
  REQUEST_DONE: "/(apps)/master/(tabs)/requests/done-requests/[id]",
  REQUEST_WORK: "/(apps)/master/(tabs)/requests/[appNumber]/work",
  REQUEST_WORK_PAYMENT:
    "/(apps)/master/(tabs)/requests/[appNumber]/work/payment",
  REQUEST_HISTORY: "/(apps)/master/(tabs)/requests/[appNumber]/history",
  REQUEST_HISTORY_DETAIL:
    "/(apps)/master/(tabs)/requests/[appNumber]/history/[historyId]",
  ACCOUNTABILITY_DETAIL: "/(apps)/master/(tabs)/accountability/[id]",
  ACCOUNTABILITY_CREATE: "/(apps)/master/(tabs)/accountability/create-request",
} as const;
