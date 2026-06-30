export interface RecentClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface RecentCase {
  id: string;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt: string;
}

export interface DashboardStats {
  totalClients: number;
  totalCases: number;
  activeCases: number;
  pendingInvitations: number;
  recentClients: RecentClient[];
  recentCases: RecentCase[];
}
