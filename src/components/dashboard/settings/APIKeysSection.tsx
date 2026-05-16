"use client";

import { useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Key, Plus, Trash2, Copy, Check, AlertTriangle,
  Loader2, Eye, EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

import { useAPIKeys, useGenerateKey, useRevokeKey } from "@/hooks/api_keys/useApiKeys";


function NewKeyModal({
  rawKey,
  onClose,
}: {
  rawKey: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full mx-4">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
            <Key className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              API Key Generated
            </h3>
            <p className="text-[11px] text-slate-400">
              Copy this key now — it will not be shown again.
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            This is the only time you will see this key. Store it securely —
            paste it into your WordPress plugin settings now.
          </p>
        </div>

        {/* Key display */}
        <div className="relative flex items-center gap-2 mb-5">
          <div className="flex-1 relative">
            <input
              type={visible ? "text" : "password"}
              value={rawKey}
              readOnly
              className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              onClick={() => setVisible((v) => !v)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              {visible
                ? <EyeOff className="w-4 h-4" />
                : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className={cn(
              "shrink-0 gap-1.5 transition-colors",
              copied && "border-emerald-500 text-emerald-600",
            )}
          >
            {copied
              ? <><Check className="w-3.5 h-3.5" /> Copied</>
              : <><Copy className="w-3.5 h-3.5" /> Copy</>}
          </Button>
        </div>

        <Button onClick={onClose} className="w-full">
          I have copied my key
        </Button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function APIKeysSection() {
  const [keyName, setKeyName] = useState("WordPress Plugin");
  const [newKey, setNewKey] = useState<string | null>(null);
  const [revoking, setRevoking] = useState<string | null>(null);

  const { data, isLoading } = useAPIKeys();
  const generateMutation = useGenerateKey();
  const revokeMutation = useRevokeKey();

  const keys = data?.keys ?? [];

  const activeKeys = keys.filter((k) => k.is_active);
  const revokedKeys = keys.filter((k) => !k.is_active);

  const handleGenerate = () => {
    generateMutation.mutate(
      { name: keyName.trim() || "WordPress Plugin" },
      {
        onSuccess: (data) => {
          setNewKey(data.raw_key);
          setKeyName("WordPress Plugin");
        },
      },
    );
  };

  const handleRevoke = async (keyId: string) => {
    if (!confirm("Revoke this API key? Any plugin using it will stop working immediately.")) return;
    setRevoking(keyId);
    revokeMutation.mutate(keyId, {
      onSettled: () => setRevoking(null),
    });
  };

  return (
    <>
      {/* Raw key modal */}
      {newKey && (
        <NewKeyModal rawKey={newKey} onClose={() => setNewKey(null)} />
      )}

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-slate-500" />
            <CardTitle className="text-base">API Keys</CardTitle>
          </div>
          <CardDescription>
            Used to connect the WordPress plugin to your StoreChat account.
            Each key is shown only once — copy it immediately after generating.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 space-y-6">

          {/* Generate new key */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Generate New Key
            </p>
            <div className="flex items-center gap-3">
              <Input
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="e.g. WordPress Plugin"
                className="max-w-xs"
              />
              <Button
                onClick={handleGenerate}
                disabled={generateMutation.isPending}
                className="gap-2 shrink-0"
              >
                {generateMutation.isPending
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Plus className="w-4 h-4" />}
                Generate Key
              </Button>
            </div>
          </div>

          <Separator />

          {/* Key list */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Active Keys
            </p>

            {isLoading ? (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : activeKeys.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2 text-slate-300 dark:text-slate-700">
                <Key className="w-7 h-7" />
                <p className="text-xs text-slate-400 font-medium">
                  No API keys yet
                </p>
                <p className="text-[11px] text-slate-300 dark:text-slate-600">
                  Generate a key above to connect your WordPress plugin.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                {activeKeys.map((k) => (
                  <div
                    key={k.id}
                    className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Active indicator */}
                      <div className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        k.is_active ? "bg-emerald-500" : "bg-slate-300",
                      )} />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                          {k.name ?? "Unnamed Key"}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {k.key_prefix}••••••••••••••••
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 ml-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-slate-400">
                          Created {formatDistanceToNow(new Date(k.created_at), { addSuffix: true })}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {k.last_used_at
                            ? `Used ${formatDistanceToNow(new Date(k.last_used_at), { addSuffix: true })}`
                            : "Never used"}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRevoke(k.id)}
                        disabled={revoking === k.id}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors disabled:opacity-50"
                        title="Revoke key"
                      >
                        {revoking === k.id
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {revokedKeys.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Revoked Keys
              </p>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                {revokedKeys.map((k) => (
                  <div
                    key={k.id}
                    className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 opacity-70"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 truncate">
                          {k.name ?? "Unnamed Key"}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {k.key_prefix}••••••••••••••••
                        </p>
                      </div>
                    </div>

                    {/* <div className="text-right hidden sm:block">
                      <p className="text-[10px] text-slate-400">
                        Revoked {formatDistanceToNow(new Date(k.created_at), { addSuffix: true })}
                      </p>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </>
  );
}