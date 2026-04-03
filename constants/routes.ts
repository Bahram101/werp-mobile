export const ROUTES = {
  REQUESTS: "/(apps)/master/(tabs)/requests",
  REQUEST: "/(apps)/master/(tabs)/requests/[appNumber]",
  REQUEST_WORK: "/(apps)/master/(tabs)/requests/[appNumber]/work",
  REQUEST_HISTORY: "/(apps)/master/(tabs)/requests/[appNumber]/history",
  REQUEST_HISTORY_DETAIL:
    "/(apps)/master/(tabs)/requests/[appNumber]/history/[historyId]",
} as const;
