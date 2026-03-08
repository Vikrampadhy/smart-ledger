import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Transaction, TransactionType, User } from "@/types";
import { mockTransactions, mockUser } from "@/data/mockData";

interface TransactionContextType {
  transactions: Transaction[];
  user: User;
  isAuthenticated: boolean;
  addTransaction: (t: Omit<Transaction, "id" | "createdAt">) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [user, setUser] = useState<User>(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addTransaction = useCallback((t: Omit<Transaction, "id" | "createdAt">) => {
    const newT: Transaction = {
      ...t,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newT, ...prev]);
  }, []);

  const updateTransaction = useCallback((id: string, data: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login = useCallback((_email: string, _password: string) => {
    setIsAuthenticated(true);
    return true;
  }, []);

  const signup = useCallback((name: string, email: string, _password: string) => {
    setUser((prev) => ({ ...prev, name, email }));
    setIsAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...data }));
  }, []);

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <TransactionContext.Provider
      value={{
        transactions, user, isAuthenticated,
        addTransaction, updateTransaction, deleteTransaction,
        login, signup, logout, updateProfile,
        totalIncome, totalExpenses, balance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
}
