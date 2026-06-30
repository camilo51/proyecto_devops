import { FolderOpen, Scale, Users } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StatCard } from "@/components/dashboard/stat-card";

export default function DashboardPage() {
  return (
    <main className="space-y-10">
      <DashboardHeader />

      <section className="grid gap-6 lg:grid-cols-3">
        <StatCard title="Clientes" value={18} icon={<Users size={28} />} />

        <StatCard title="Casos" value={12} icon={<FolderOpen size={28} />} />

        <StatCard title="Abogados" value={2} icon={<Scale size={28} />} />
      </section>

      <RecentActivity />
    </main>
  );
}
