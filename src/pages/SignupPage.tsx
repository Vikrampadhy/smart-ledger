import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTransactions } from "@/context/TransactionContext";
import { TrendingUp } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useTransactions();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("All fields required"); return; }
    if (password.length < 6) { setError("Password must be 6+ characters"); return; }
    signup(name, email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-xl">SmartExpense</span>
          </Link>
          <h1 className="text-2xl font-display font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Start tracking your finances</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card border rounded-lg p-6">
          {error && <p className="text-xs text-expense">{error}</p>}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Alex Johnson"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90">
            Create account
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
