export function getSurnameAndName(fullName: string | undefined): string {
  if (!fullName) return "";
  const parts = fullName.split(" ").filter(Boolean);
  const [surname, name] = [parts[0] ?? "", parts[1] ?? ""];
  return `${surname} ${name}`.trim();
}

// export const formatMoney = (value: number): string => {
//   return new Intl.NumberFormat('ru-RU').format(value) + ' ₸'
// }

export const formatCurrency = (value: number, symbol: string = "₸"): string => {
  if (value == null || isNaN(value)) return `0 ${symbol}`;

  return value.toLocaleString("ru-RU") + ` ${symbol}`;
};
