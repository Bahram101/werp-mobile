export function getSurnameAndName(fullName: string | undefined): string {
  if (!fullName) return "";
  const parts = fullName.split(" ").filter(Boolean);
  const [surname, name] = [parts[0] ?? "", parts[1] ?? ""];
  return `${surname} ${name}`.trim();
}
