import { Transaction, User } from "@/types";

export const mockUser: User = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  createdAt: "2024-01-15T00:00:00Z",
};

const now = new Date();
const m = (monthsAgo: number, day: number) => {
  const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, day);
  return d.toISOString().split("T")[0];
};

export const mockTransactions: Transaction[] = [
  { id: "1", type: "income", amount: 5200, category: "Salary", description: "Monthly salary", date: m(0, 1), createdAt: m(0, 1) },
  { id: "2", type: "expense", amount: 45, category: "Food", description: "Grocery store", date: m(0, 3), createdAt: m(0, 3) },
  { id: "3", type: "expense", amount: 120, category: "Bills", description: "Electric bill", date: m(0, 5), createdAt: m(0, 5) },
  { id: "4", type: "expense", amount: 35, category: "Transport", description: "Gas station", date: m(0, 7), createdAt: m(0, 7) },
  { id: "5", type: "expense", amount: 89, category: "Shopping", description: "Online purchase", date: m(0, 8), createdAt: m(0, 8) },
  { id: "6", type: "income", amount: 800, category: "Freelance", description: "Design project", date: m(0, 10), createdAt: m(0, 10) },
  { id: "7", type: "expense", amount: 55, category: "Entertainment", description: "Cinema & dinner", date: m(0, 12), createdAt: m(0, 12) },
  { id: "8", type: "expense", amount: 200, category: "Healthcare", description: "Dental checkup", date: m(0, 14), createdAt: m(0, 14) },
  { id: "9", type: "expense", amount: 65, category: "Food", description: "Restaurant", date: m(0, 16), createdAt: m(0, 16) },
  { id: "10", type: "expense", amount: 30, category: "Transport", description: "Uber rides", date: m(0, 18), createdAt: m(0, 18) },
  // Last month
  { id: "11", type: "income", amount: 5200, category: "Salary", description: "Monthly salary", date: m(1, 1), createdAt: m(1, 1) },
  { id: "12", type: "expense", amount: 320, category: "Food", description: "Groceries", date: m(1, 5), createdAt: m(1, 5) },
  { id: "13", type: "expense", amount: 150, category: "Bills", description: "Internet + phone", date: m(1, 8), createdAt: m(1, 8) },
  { id: "14", type: "expense", amount: 250, category: "Shopping", description: "Clothing", date: m(1, 12), createdAt: m(1, 12) },
  { id: "15", type: "expense", amount: 80, category: "Entertainment", description: "Concert tickets", date: m(1, 15), createdAt: m(1, 15) },
  { id: "16", type: "expense", amount: 45, category: "Transport", description: "Parking", date: m(1, 18), createdAt: m(1, 18) },
  { id: "17", type: "income", amount: 450, category: "Freelance", description: "Consulting", date: m(1, 20), createdAt: m(1, 20) },
  // 2 months ago
  { id: "18", type: "income", amount: 5200, category: "Salary", description: "Monthly salary", date: m(2, 1), createdAt: m(2, 1) },
  { id: "19", type: "expense", amount: 280, category: "Food", description: "Groceries", date: m(2, 4), createdAt: m(2, 4) },
  { id: "20", type: "expense", amount: 180, category: "Bills", description: "Utilities", date: m(2, 7), createdAt: m(2, 7) },
  { id: "21", type: "expense", amount: 95, category: "Healthcare", description: "Pharmacy", date: m(2, 10), createdAt: m(2, 10) },
  { id: "22", type: "expense", amount: 60, category: "Transport", description: "Train tickets", date: m(2, 14), createdAt: m(2, 14) },
  { id: "23", type: "expense", amount: 150, category: "Entertainment", description: "Weekend trip", date: m(2, 20), createdAt: m(2, 20) },
  // 3 months ago
  { id: "24", type: "income", amount: 5200, category: "Salary", description: "Monthly salary", date: m(3, 1), createdAt: m(3, 1) },
  { id: "25", type: "expense", amount: 350, category: "Food", description: "Groceries + dining", date: m(3, 6), createdAt: m(3, 6) },
  { id: "26", type: "expense", amount: 200, category: "Bills", description: "Bills", date: m(3, 10), createdAt: m(3, 10) },
  { id: "27", type: "expense", amount: 175, category: "Shopping", description: "Electronics", date: m(3, 15), createdAt: m(3, 15) },
  { id: "28", type: "income", amount: 600, category: "Freelance", description: "Side project", date: m(3, 22), createdAt: m(3, 22) },
  // 4 & 5 months ago
  { id: "29", type: "income", amount: 5200, category: "Salary", description: "Monthly salary", date: m(4, 1), createdAt: m(4, 1) },
  { id: "30", type: "expense", amount: 400, category: "Food", description: "Groceries", date: m(4, 5), createdAt: m(4, 5) },
  { id: "31", type: "expense", amount: 130, category: "Bills", description: "Utilities", date: m(4, 9), createdAt: m(4, 9) },
  { id: "32", type: "income", amount: 5200, category: "Salary", description: "Monthly salary", date: m(5, 1), createdAt: m(5, 1) },
  { id: "33", type: "expense", amount: 500, category: "Shopping", description: "Holiday gifts", date: m(5, 15), createdAt: m(5, 15) },
  { id: "34", type: "expense", amount: 300, category: "Food", description: "Dining out", date: m(5, 20), createdAt: m(5, 20) },
];
