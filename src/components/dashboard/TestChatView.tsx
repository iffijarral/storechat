"use client";

import { useAuthStore } from "@/store/authStore";
import { useGetStoreConfig } from "@/hooks/store-config/useGetStoreConfig";
import { AlertCircle, RefreshCw, ExternalLink, Info } from "lucide-react";
import { useState } from "react";

// Your widget dev server or production CDN url
const WIDGET_BASE_URL =
    process.env.NEXT_PUBLIC_WIDGET_URL || "http://localhost:5173";

// Your backend API url passed to the widget
const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export function TestChatView() {
    const activeStoreId = useAuthStore((s) => s.activeStoreId);
    const activeStore = useAuthStore((s) =>
        s.stores.find((store) => store.store_id === s.activeStoreId)
    );

    const activeStoreUrl = activeStore?.store_url;
    const { data: config, isLoading } = useGetStoreConfig();
    const [iframeKey, setIframeKey] = useState(0);   // increment to reload iframe
    const [iframeError, setIframeError] = useState(false);
    
    const storeUrl = activeStoreUrl || "yourstore.com";
    const botName = config?.branding?.bot_name ?? "Assistant";
    const primaryColor = config?.branding?.primary_color ?? "#2563eb";

    // The iframe src is your widget running in dev/prod mode
    // We pass store_id and api_url as query params so the widget
    // can initialize without window.StoreChatConfig
    const iframeSrc = `${WIDGET_BASE_URL}?store_id=${activeStoreId}&api_url=${encodeURIComponent(API_URL)}`;

    const handleReload = () => {
        setIframeError(false);
        setIframeKey((k) => k + 1);
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                        Test Your Bot
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Chat with your bot exactly as your customers will see it.
                    </p>
                </div>
                <button
                    onClick={handleReload}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reload Widget
                </button>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/40 rounded-xl px-4 py-3">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700 dark:text-blue-400 space-y-0.5">
                    <p className="font-semibold">This is a live test — messages are real</p>
                    <p>Conversations started here appear in your Conversations inbox. Use a recognizable message like TEST: so you can identify them.</p>
                </div>
            </div>

            {/* Main layout: iframe + config panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Widget preview */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">

                        {/* Mock browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                            </div>
                            <div className="flex-1 mx-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono">
                                {storeUrl}
                            </div>
                            <a
                                href={WIDGET_BASE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                                title="Open widget in new tab"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* iframe */}
                        <div className="relative h-150 bg-slate-50 dark:bg-slate-950">
                            {isLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : iframeError ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-400">
                                    <AlertCircle className="w-8 h-8 text-red-400" />
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                            Could not load widget
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            Make sure your widget dev server is running at{" "}
                                            <code className="font-mono">{WIDGET_BASE_URL}</code>
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleReload}
                                        className="text-xs font-semibold text-blue-600 hover:underline"
                                    >
                                        Try again
                                    </button>
                                </div>
                            ) : (
                                <iframe
                                    key={iframeKey}
                                    src={iframeSrc}
                                    className="w-full h-full border-0"
                                    title="StoreChat Widget Preview"
                                    onError={() => setIframeError(true)}
                                    allow="microphone"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Config info panel */}
                <div className="space-y-4">

                    {/* Current config */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                            Active Configuration
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                    Bot Name
                                </p>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                                    {botName}
                                </p>
                            </div>

                            <div>
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                    Primary Color
                                </p>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-5 h-5 rounded-md border border-slate-200"
                                        style={{ backgroundColor: primaryColor }}
                                    />
                                    <p className="text-sm font-mono text-slate-600 dark:text-slate-400">
                                        {primaryColor}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                    Store ID
                                </p>
                                <p className="text-[11px] font-mono text-slate-400 break-all">
                                    {activeStoreId}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                            Testing Tips
                        </h3>
                        <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                            {[
                                "Start messages with \"TEST:\" so you can find them in your inbox",
                                "Try asking about your products to verify RAG is working",
                                "Test edge cases — questions your bot might not know",
                                "Check escalation by asking something complex",
                                "After config changes, click Reload Widget to see updates",
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-400 font-bold mt-0.5">·</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}