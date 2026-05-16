"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

export function BillingErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 text-center">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
        Could not load billing data
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-xs">
        We ran into a problem syncing with our payment provider. Please try refreshing the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh dashboard
      </button>
    </div>
  );
}