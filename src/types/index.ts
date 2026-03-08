export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Healthcare",
  "Other",
] as const;

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Other",
] as const;

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export type Category = (typeof ALL_CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  Food: "hsl(var(--chart-1))",
  Transport: "hsl(var(--chart-2))",
  Shopping: "hsl(var(--chart-3))",
  Bills: "hsl(var(--chart-4))",
  Entertainment: "hsl(var(--chart-5))",
  Healthcare: "hsl(var(--chart-6))",
  Salary: "hsl(var(--chart-1))",
  Freelance: "hsl(var(--chart-2))",
  Investment: "hsl(var(--chart-3))",
  Other: "hsl(var(--muted-foreground))",
};
