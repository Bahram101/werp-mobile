export function getSurnameAndName(fullName: string | undefined): string {
  if (!fullName) return "";
  const parts = fullName.split(" ").filter(Boolean);
  const [surname, name] = [parts[0] ?? "", parts[1] ?? ""];
  return `${surname} ${name}`.trim();
}

export const formatMoney = (value: number): string => {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
};

export const formatCurrency = (value: number, symbol: string = "₸"): string => {
  if (value == null || isNaN(value)) return `0 ${symbol}`;

  return value.toLocaleString("ru-RU") + ` ${symbol}`;
};

export const formatNumber = (value: string) => {
  if (!value) return "";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const tenge = String.fromCharCode(0x20b8);

export const strToLowerCase = (str: string | undefined): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatFullName = (str: string): string => {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};
