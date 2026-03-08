import { useState, useMemo } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TransactionTable } from "@/components/TransactionTable";
import { TransactionModal } from "@/components/TransactionModal";
import { Transaction } from "@/types";
import { Plus, Search } from "lucide-react";
import { ALL_CATEGORIES } from "@/types";

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        if (filterType !== "all" && t.type !== filterType) return false;
        if (filterCategory !== "all" && t.category !== filterCategory) return false;
        if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, filterType, filterCategory, search]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Transactions</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} transactions</p>
          </div>
          <button
            onClick={() => { setEditTx(null); setModalOpen(true); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text" placeholder="Search transactions..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-md border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={filterType} onChange={(e) => setFilterType(e.target.value)}
            className="rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Categories</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-card border rounded-lg p-5">
          <TransactionTable
            transactions={filtered}
            onEdit={(t) => { setEditTx(t); setModalOpen(true); }}
            onDelete={deleteTransaction}
          />
        </div>
      </div>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} editTransaction={editTx} />
    </DashboardLayout>
  );
}
