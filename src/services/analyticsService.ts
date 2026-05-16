// services/analyticsService.ts
import { api } from "./api";
import { AnalyticsReport } from "@/types/analytics";

export const analyticsService = {
  getReport: async (storeId: string, range: "7d" | "30d" | "90d"): Promise<AnalyticsReport> => {
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const response = await api.get(`/stores/${storeId}/analytics/report?days=${days}`);
  return response.data;
},
};