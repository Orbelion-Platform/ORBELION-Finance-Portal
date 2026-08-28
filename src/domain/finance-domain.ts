export function addMonthsClamped(dateValue: string, months: number): string {
  const [year, month, day] = dateValue.split("-").map(Number);
  const target = new Date(Date.UTC(year, month - 1 + months, 1, 12));
  const lastDay = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0, 12),
  ).getUTCDate();
  target.setUTCDate(Math.min(day, lastDay));
  return target.toISOString().slice(0, 10);
}

export function costaRicaDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Costa_Rica",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function daysBetween(dateValue: string, todayValue: string): number {
  const target = Date.parse(`${dateValue}T12:00:00Z`);
  const today = Date.parse(`${todayValue}T12:00:00Z`);
  return Math.round((target - today) / 86_400_000);
}

export function reminderKeyFor(
  daysUntilDue: number,
  todayValue: string,
): string | null {
  if (daysUntilDue === 2) return "due-2";
  if (daysUntilDue === 1) return "due-1";
  if (daysUntilDue === 0) return "due-0";
  if (daysUntilDue < 0) return `overdue-${todayValue}`;
  return null;
}

export function obligationAlertStatus(
  status: string,
  dueDate: string,
  todayValue: string,
): string {
  if (status === "paid" || status === "cancelled") return status;
  return dueDate < todayValue ? "overdue" : "open";
}

export function adjustObligationBalance(
  currentBalanceMinor: number,
  previousAmountMinor: number,
  nextAmountMinor: number,
  originalAmountMinor: number,
): number {
  return Math.min(
    originalAmountMinor,
    Math.max(0, currentBalanceMinor + previousAmountMinor - nextAmountMinor),
  );
}

export function obligationMovementType(
  kind: string,
): "income" | "expense" {
  return kind === "receivable" ? "income" : "expense";
}
