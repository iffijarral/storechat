// components/dashboard/plugin/steps/ApiKeyStep.tsx

"use client";

import { useState } from "react";
import { Key, Copy, Check, Zap, ArrowRight } from "lucide-react";
import { useGenerateKey } from "@/hooks/api_keys/useApiKeys";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ApiError {
  response?: { data?: { detail?: string } };
}

export function ApiKeyStep() {
  const [copied, setCopied] = useState(false);
  const { mutate: generate, isPending, data, error } = useGenerateKey();

  const generatedKey = data?.raw_key ?? null;

  const handleCopy = async () => {
    if (!generatedKey) return;
    await navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {!generatedKey ? (
        <>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Generate a dedicated API key for the WordPress plugin.
            Keep it secure — you will only see it once.
          </p>

          <button
            onClick={() => generate({ name: "WordPress Plugin" })}
            disabled={isPending}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
          >
            <Key className="w-3.5 h-3.5" />
            {isPending ? "Generating..." : "Generate API Key"}
          </button>

          {error && (
            <p className="text-xs text-red-500">
              {(error as ApiError)?.response?.data?.detail || "Failed to generate key."}
            </p>
          )}
        </>
      ) : (
        <>
          {/* Key display */}
          <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
            <code className="flex-1 text-xs font-mono text-slate-700 dark:text-slate-200 truncate">
              {generatedKey}
            </code>
            <button
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0",
                copied
                  ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                  : "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20",
              )}
            >
              {copied
                ? <><Check className="w-3 h-3" /> Copied</>
                : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>

          {/* Security warning */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl">
            <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">
              <strong>Copy this key now.</strong> For security reasons it will
              not be shown again. Paste it into the StoreChat plugin settings
              in WordPress.
            </p>
          </div>

          {/* Link to full key management */}
          <div className="pt-1">
            <Link
              href="/settings/api-keys"
              className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              Manage all API keys
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}