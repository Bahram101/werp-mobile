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
  if (item.urgencyLevel) {
    return {
      label: "Срочная",
      text: "text-error-400",
      bgInner: "bg-error-400",
      bgOuter: "bg-error-50",
    };
  }
  switch (item.applicationStatusId) {
    case 9:
    case 10:
      return {
        label: "Активная",
        text: "text-primary",
        bgInner: "bg-success-300",
        bgOuter: "bg-success-50",
      };
    default:
      return {};
  }
};

export const getPaymentLabel = (payment: string) => {
  switch (payment) {
    case "1":
      return "Наличный";
    case "2":
      return "Безналичный";
    default:
      return "";
  }
};
