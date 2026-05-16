"use client";
 
import { Download } from "lucide-react";
import { useDownloadPlugin } from "@/hooks/plugin/useDownloadPlugin";
 
export function DownloadStep() {
  const { mutate: download, isPending } = useDownloadPlugin();
 
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            storechat.zip
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            WordPress plugin · Latest version
          </p>
        </div>
 
        <button
          onClick={() => download()}
          disabled={isPending}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
        >
          <Download className="w-3.5 h-3.5" />
          {isPending ? "Downloading..." : "Download"}
        </button>
      </div>
 
      <p className="text-[11px] text-slate-400">
        This file contains the complete StoreChat WordPress plugin.
        Keep it handy for Step 3.
      </p>
    </div>
  );
}