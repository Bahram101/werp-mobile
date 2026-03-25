import { format, parse } from "date-fns";

export const parseDate = (value: string, formatStr: string) =>
  parse(value, formatStr, new Date());

export const formatDate = (date: Date, formatStr: string) =>
  format(date, formatStr);

export const convertDateFormat = (
  dateStr: string,
  fromFormat: string,
  toFormat: string,
) => {
  const date = parse(dateStr, fromFormat, new Date());
  return format(date, toFormat);
};

export const formatDayMonth = (date: string) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
};

export const formatFullDate = (date: string) => {
  const normalized = date.replace(" ", "T");
  return new Date(normalized).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getLastDaysRange = (days: number) => {
  const today = new Date();
  const fromDate = new Date();

  fromDate.setDate(today.getDate() - days);

  return {
    from: fromDate.toISOString().split("T")[0],
    to: today.toISOString().split("T")[0],
  };
};
