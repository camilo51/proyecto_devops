import { api } from "@/lib/api";
import { DashboardStats } from "@/types/dashboard";

export class DashboardService {
  static async findStats() {
    const response = await api.get<DashboardStats>("/dashboard");

    return response.data;
  }
}
