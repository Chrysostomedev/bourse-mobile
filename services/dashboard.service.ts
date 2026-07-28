import { get } from "../core/axios.mobile";
import type { DashboardResponse } from "../types/dashboard.types";

export const dashboardService = {
  getHome: () => get<DashboardResponse>("/dashboard"),
};