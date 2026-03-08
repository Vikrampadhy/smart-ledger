import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
  compact?: boolean;
}

export function TransactionTable({ transactions, onEdit, onDelete, compact = false }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-sm">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="text-left py-3 px-2 font-medium">Description</th>
            <th className="text-left py-3 px-2 font-medium">Category</th>
            <th className="text-left py-3 px-2 font-medium hidden sm:table-cell">Date</th>
            <th className="text-right py-3 px-2 font-medium">Amount</th>
            {!compact && <th className="text-right py-3 px-2 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr
              key={t.id}
              className="border-b border-border/50 hover:bg-accent/30 transition-colors animate-fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <td className="py-3 px-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${t.type === "income" ? "bg-income/10" : "bg-expense/10"}`}>
                    {t.type === "income" ? (
                      <TrendingUp className="h-3.5 w-3.5 text-income" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-expense" />
                    )}
                  </div>
                  <span className="font-medium">{t.description}</span>
                </div>
              </td>
              <td className="py-3 px-2">
                <span className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                  {t.category}
                </span>
              </td>
              <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{formatDate(t.date)}</td>
              <td className={`py-3 px-2 text-right font-semibold ${t.type === "income" ? "text-income" : "text-expense"}`}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </td>
              {!compact && (
                <td className="py-3 px-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => onEdit(t)} className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => onDelete(t.id)} className="p-1.5 rounded hover:bg-expense/10 text-muted-foreground hover:text-expense">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
