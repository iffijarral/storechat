import { api } from "./api";
import { StoreConfigValues } from "@/lib/validations/storeConfig";
import { StoreResponse } from "@/types/store";
import { StoreValues } from "@/lib/validations/store";
export const storeService = {
    registerStore: async (data: StoreValues): Promise<StoreResponse> => {
        const response = await api.post<StoreResponse>("/stores/", {
            store_url: data.storeUrl,         // Mapping 'storeUrl' -> 'store_url'
            store_name: data.storeName,       // Mapping 'storeName' -> 'store_name'
            woo_consumer_key: data.wooKey,    // Mapping 'wooKey' -> 'woo_consumer_key'
            woo_consumer_secret: data.wooSecret // Mapping 'wooSecret' -> 'woo_consumer_secret'
        });
        return response.data;
    },
    // GET /{store_id}/config
    getConfig: (storeId: string) =>
        api.get(`/stores/${storeId}/config`),

    // PATCH /{store_id}/config
    updateConfig: (storeId: string, data: StoreConfigValues) =>
        api.patch(`/stores/${storeId}/config`, data),

    // GET /{store_id}/usage
    getUsage: (storeId: string) =>
        api.get(`/stores/${storeId}/usage`),
};