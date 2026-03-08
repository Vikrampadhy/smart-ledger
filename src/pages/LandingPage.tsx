import { Link } from "react-router-dom";
import { BarChart3, Shield, Zap, PieChart, ArrowRight, TrendingUp } from "lucide-react";

const features = [
  { icon: BarChart3, title: "Smart Analytics", desc: "Visualize spending patterns with interactive charts and monthly trends." },
  { icon: Shield, title: "Secure & Private", desc: "Your financial data stays safe with enterprise-grade security." },
  { icon: Zap, title: "Quick Tracking", desc: "Add transactions in seconds with smart categorization." },
  { icon: PieChart, title: "Category Insights", desc: "Break down expenses by category to find savings opportunities." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-xl">SmartExpense</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          <Zap className="h-3 w-3" /> Smart financial tracking
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-tight mb-6">
          Take control of your
          <span className="text-primary"> finances</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Track income and expenses, analyze spending habits, and gain financial insights
          with beautiful, interactive analytics.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Start Tracking Free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border text-foreground font-medium hover:bg-accent transition-colors"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-center mb-12">
          Everything you need to manage money
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="p-2 rounded-md bg-primary/10 w-fit mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 md:px-12 py-8 text-center text-sm text-muted-foreground">
        © 2026 SmartExpense. Built with ❤️
      </footer>
    </div>
  );
}
