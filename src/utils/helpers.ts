import { Transaction } from "@/types";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function getMonthlyData(transactions: Transaction[]) {
  const months: Record<string, { income: number; expenses: number; month: string }> = {};
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    if (!months[key]) months[key] = { income: 0, expenses: 0, month: label };
    if (t.type === "income") months[key].income += t.amount;
    else months[key].expenses += t.amount;
  });
  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
}

export function getCategoryData(transactions: Transaction[]) {
  const cats: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      cats[t.category] = (cats[t.category] || 0) + t.amount;
    });
  return Object.entries(cats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
