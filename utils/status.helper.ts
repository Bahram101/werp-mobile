export type StatusText = "assigned" | "done" | "finished";

const map: Record<StatusText, string> = {
  assigned: "text-red",
  done: "text-blue",
  finished: "text-primary",
};

export const getStatusColor = (status: StatusText): string => {
  return map[status];
};
/****************************************************************** */
export const getStatusMeta = (item: any) => {
  if (item.applicationStatusId === 9 || item.applicationStatusId === 10) {
    return {
      label: "Активная",
      text: "text-primary",
      bgInner: "bg-success-300",
      bgOuter: "bg-success-50",
    };
  }
  if (item.urgencyLevel) {
    return {
      label: "Срочная",
      text: "text-error-400",
      bgInner: "bg-error-400",
      bgOuter: "bg-error-50",
    };
  }

  return {};
};

export const getPaymentLabel = (payment: string) => {
  switch (payment) {
    case "CASH":
      return "Наличный";
    case "CASHLESS":
      return "Безналичный";
    default:
      return "";
  }
};
