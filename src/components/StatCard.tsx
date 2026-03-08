import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "income" | "expense";
}

export function StatCard({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) {
  const variantStyles = {
    default: "bg-card border",
    income: "bg-income/10 border border-income/20",
    expense: "bg-expense/10 border border-expense/20",
  };

  const iconStyles = {
    default: "text-primary",
    income: "text-income",
    expense: "text-expense",
  };

  return (
    <div className={`rounded-lg p-5 ${variantStyles[variant]} animate-fade-in`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <Icon className={`h-5 w-5 ${iconStyles[variant]}`} />
      </div>
      <p className="text-2xl font-display font-bold tracking-tight">{value}</p>
      {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
    </div>
  );
}
