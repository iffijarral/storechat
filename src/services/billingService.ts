// src/services/billingService.ts

import { api } from "./api";
import {
  BillingSummary,
  ChangePlanRequest,
  ChangePlanResponse,
} from "@/types/billing";

export const billingService = {
  getSummary: async (storeId: string): Promise<BillingSummary> => {
    const res = await api.get<BillingSummary>(`/billing/summary/${storeId}`);
    return res.data;
  },

  changePlan: async (
    storeId: string,
    data: ChangePlanRequest
  ): Promise<ChangePlanResponse> => {
    const res = await api.post<ChangePlanResponse>(
      `/billing/change-plan/${storeId}`,
      data
    );
    return res.data;
  },
};