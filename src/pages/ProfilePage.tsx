import { useState } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { formatDate } from "@/utils/helpers";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, updateProfile } = useTransactions();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    toast.success("Profile updated!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-lg space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your account</p>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-display font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-display font-semibold text-lg">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">Member since {formatDate(user.createdAt)}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button type="submit" className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
