import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTransactions } from "@/context/TransactionContext";
import { TransactionType, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/types";
import { Transaction } from "@/types";
import { X } from "lucide-react";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  editTransaction?: Transaction | null;
}

interface FormData {
  type: TransactionType;
  amount: string;
  category: string;
  description: string;
  date: string;
}

export function TransactionModal({ open, onClose, editTransaction }: TransactionModalProps) {
  const { addTransaction, updateTransaction } = useTransactions();
  const isEdit = !!editTransaction;

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: editTransaction
      ? {
          type: editTransaction.type,
          amount: editTransaction.amount.toString(),
          category: editTransaction.category,
          description: editTransaction.description,
          date: editTransaction.date,
        }
      : {
          type: "expense",
          amount: "",
          category: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        },
  });

  const type = watch("type");
  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const onSubmit = (data: FormData) => {
    const payload = {
      type: data.type,
      amount: parseFloat(data.amount),
      category: data.category,
      description: data.description,
      date: data.date,
    };

    if (isEdit && editTransaction) {
      updateTransaction(editTransaction.id, payload);
    } else {
      addTransaction(payload);
    }
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <div className="bg-card border rounded-lg w-full max-w-md p-6 shadow-lg animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-semibold">
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            {(["expense", "income"] as const).map((t) => (
              <label
                key={t}
                className={`flex-1 text-center py-2 rounded-md cursor-pointer border text-sm font-medium transition-colors ${
                  type === t
                    ? t === "income"
                      ? "bg-income text-income-foreground border-income"
                      : "bg-expense text-expense-foreground border-expense"
                    : "bg-secondary text-muted-foreground border-border hover:bg-accent"
                }`}
              >
                <input type="radio" value={t} {...register("type")} className="sr-only" />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Amount</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount", { required: "Amount is required", min: { value: 0.01, message: "Must be > 0" } })}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.amount && <p className="text-xs text-expense mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Category</label>
            <select
              {...register("category", { required: "Pick a category" })}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-expense mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            <input
              type="text"
              placeholder="What was this for?"
              {...register("description", { required: "Description required" })}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <input
              type="date"
              {...register("date", { required: "Date required" })}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {isEdit ? "Update" : "Add"} Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
