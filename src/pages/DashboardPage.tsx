import { useState } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { TransactionTable } from "@/components/TransactionTable";
import { TransactionModal } from "@/components/TransactionModal";
import { formatCurrency, getMonthlyData, getCategoryData } from "@/utils/helpers";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Transaction } from "@/types";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const PIE_COLORS = [
  "hsl(160, 84%, 39%)", "hsl(199, 89%, 48%)", "hsl(271, 81%, 56%)",
  "hsl(31, 97%, 62%)", "hsl(347, 77%, 50%)", "hsl(43, 96%, 56%)",
];

export default function DashboardPage() {
  const { transactions, totalIncome, totalExpenses, balance, deleteTransaction } = useTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  const monthlyData = getMonthlyData(transactions);
  const categoryData = getCategoryData(transactions);
  const recentTx = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Your financial overview</p>
          </div>
          <button
            onClick={() => { setEditTx(null); setModalOpen(true); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Balance" value={formatCurrency(balance)} icon={Wallet} />
          <StatCard title="Total Income" value={formatCurrency(totalIncome)} icon={TrendingUp} variant="income" />
          <StatCard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={TrendingDown} variant="expense" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border rounded-lg p-5">
            <h3 className="font-display font-semibold mb-4">Monthly Overview</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)", fontSize: "13px" }}
                />
                <Bar dataKey="income" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expenses" fill="hsl(347, 77%, 50%)" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border rounded-lg p-5">
            <h3 className="font-display font-semibold mb-4">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%" cy="50%"
                  innerRadius={60} outerRadius={100}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent */}
        <div className="bg-card border rounded-lg p-5">
          <h3 className="font-display font-semibold mb-4">Recent Transactions</h3>
          <TransactionTable
            transactions={recentTx}
            onEdit={(t) => { setEditTx(t); setModalOpen(true); }}
            onDelete={deleteTransaction}
            compact
          />
        </div>
      </div>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} editTransaction={editTx} />
    </DashboardLayout>
  );
}
