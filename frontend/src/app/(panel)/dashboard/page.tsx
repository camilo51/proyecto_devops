"use client";

import { FolderOpen, Mail, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RecentCases } from "@/components/dashboard/recent-cases";
import { RecentClients } from "@/components/dashboard/recent-clients";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardService } from "@/services/dashboard.service";
import { DashboardStats } from "@/types/dashboard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const response = await DashboardService.findStats();

    setStats(response);
  }

  if (!stats) {
    return (
      <main className="flex h-full items-center justify-center">
        <p className="font-medium text-muted">Cargando dashboard...</p>
      </main>
    );
  }

  return (
    <main className="space-y-10">
      <DashboardHeader />

      <section className="grid gap-6 lg:grid-cols-4">
        <StatCard
          title="Clientes"
          value={stats.totalClients}
          icon={<Users size={28} />}
        />

        <StatCard
          title="Casos"
          value={stats.totalCases}
          icon={<FolderOpen size={28} />}
        />

        <StatCard
          title="Casos activos"
          value={stats.activeCases}
          icon={<FolderOpen size={28} />}
        />

        <StatCard
          title="Invitaciones"
          value={stats.pendingInvitations}
          icon={<Mail size={28} />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <RecentClients clients={stats.recentClients} />

        <RecentCases cases={stats.recentCases} />
      </section>
    </main>
  );
}
