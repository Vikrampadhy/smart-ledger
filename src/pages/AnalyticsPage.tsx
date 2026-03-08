import { useTransactions } from "@/context/TransactionContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { formatCurrency, getMonthlyData, getCategoryData } from "@/utils/helpers";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
  LineChart, Line,
  AreaChart, Area,
} from "recharts";

const PIE_COLORS = [
  "hsl(160, 84%, 39%)", "hsl(199, 89%, 48%)", "hsl(271, 81%, 56%)",
  "hsl(31, 97%, 62%)", "hsl(347, 77%, 50%)", "hsl(43, 96%, 56%)",
];

export default function AnalyticsPage() {
  const { transactions, totalIncome, totalExpenses } = useTransactions();
  const monthlyData = getMonthlyData(transactions);
  const categoryData = getCategoryData(transactions);

  const savingsData = monthlyData.map((m) => ({
    ...m,
    savings: m.income - m.expenses,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Detailed financial insights</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Avg Monthly Income</p>
            <p className="text-xl font-display font-bold text-income">
              {formatCurrency(monthlyData.length ? totalIncome / monthlyData.length : 0)}
            </p>
          </div>
          <div className="bg-card border rounded-lg p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Avg Monthly Expenses</p>
            <p className="text-xl font-display font-bold text-expense">
              {formatCurrency(monthlyData.length ? totalExpenses / monthlyData.length : 0)}
            </p>
          </div>
          <div className="bg-card border rounded-lg p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Savings Rate</p>
            <p className="text-xl font-display font-bold text-primary">
              {totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Income vs Expense Trend */}
        <div className="bg-card border rounded-lg p-5">
          <h3 className="font-display font-semibold mb-4">Income vs Expenses Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(347, 77%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(347, 77%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)", fontSize: "13px" }} />
              <Legend />
              <Area type="monotone" dataKey="income" stroke="hsl(160, 84%, 39%)" fill="url(#incomeGrad)" strokeWidth={2} name="Income" />
              <Area type="monotone" dataKey="expenses" stroke="hsl(347, 77%, 50%)" fill="url(#expenseGrad)" strokeWidth={2} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <div className="bg-card border rounded-lg p-5">
            <h3 className="font-display font-semibold mb-4">Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={110} dataKey="value" paddingAngle={2}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Savings */}
          <div className="bg-card border rounded-lg p-5">
            <h3 className="font-display font-semibold mb-4">Monthly Savings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)", fontSize: "13px" }} formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="savings" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category List */}
        <div className="bg-card border rounded-lg p-5">
          <h3 className="font-display font-semibold mb-4">Expense Categories</h3>
          <div className="space-y-3">
            {categoryData.map((cat, i) => {
              const total = categoryData.reduce((s, c) => s + c.value, 0);
              const pct = total > 0 ? (cat.value / total) * 100 : 0;
              return (
                <div key={cat.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-sm font-medium flex-1">{cat.name}</span>
                  <span className="text-sm text-muted-foreground">{formatCurrency(cat.value)}</span>
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">{pct.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
