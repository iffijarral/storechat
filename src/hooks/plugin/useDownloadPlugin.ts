import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
 
export function useDownloadPlugin() {
  return useMutation({
    mutationFn: async () => {
      const res = await api.get("/plugin/download", {
        responseType: "blob",
      });
 
      // Trigger browser download
      const url     = window.URL.createObjectURL(new Blob([res.data]));
      const link    = document.createElement("a");
      link.href     = url;
      link.download = "storechat.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });
}