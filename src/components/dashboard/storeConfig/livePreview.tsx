"use client";

// src/app/(dashboard)/store-config/livePreview.tsx

import { Bot, X, Send, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoreConfigValues } from "@/lib/validations/storeConfig";

const BUTTON_RADIUS: Record<string, string> = {
  rounded: "rounded-xl",
  square:  "rounded-none",
  pill:    "rounded-full",
};

export function LivePreview({ values }: { values: Partial<StoreConfigValues> & Pick<StoreConfigValues, "branding" | "ui"> }) {
  const isDark  = values.ui.theme === "dark";
  const isLeft  = values.ui.position === "bottom-left";
  const radius  = BUTTON_RADIUS[values.ui.button_style] ?? "rounded-xl";

  const welcomeMessage  = values.behavior?.welcome_message  || "Hi! How can I help you today?";
  const placeholder     = values.behavior?.placeholder_text || "Type your message...";
  const questions       = values.behavior?.suggested_questions ?? [];

  // Show max 3 in preview to keep it compact
  const previewQuestions = questions.filter(q => q.trim().length > 0).slice(0, 3);

  return (
    <div className="relative h-125 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900/40 overflow-hidden">

      {/* Label */}
      <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
        Live Preview
      </div>

      {/* Fake browser chrome */}
      <div className="absolute top-4 right-4 flex gap-1">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
      </div>

      {/* Chat window */}
      <div
        className={cn(
          "absolute bottom-16 w-64 shadow-2xl overflow-hidden border",
          isLeft ? "left-4" : "right-4",
          isDark
            ? "bg-zinc-900 border-zinc-700 text-white"
            : "bg-white border-slate-200 text-slate-900",
          "rounded-2xl",
        )}
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ backgroundColor: values.branding.primary_color }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white truncate max-w-30">
              {values.branding.bot_name || "Assistant"}
            </span>
          </div>
          <X className="w-4 h-4 text-white/70" />
        </div>

        {/* Messages + action cards */}
        <div className={cn(
          "p-3 space-y-2 overflow-hidden",
          isDark ? "bg-zinc-900" : "bg-slate-50",
          // Taller when there are questions to show
          previewQuestions.length > 0 ? "h-52" : "h-28",
        )}>

          {/* Welcome message bubble */}
          <div className="flex gap-2 items-end">
            <div
              className="w-5 h-5 rounded-full shrink-0"
              style={{ backgroundColor: values.branding.primary_color }}
            />
            <div className={cn(
              "text-xs px-3 py-2 rounded-2xl rounded-bl-none max-w-[85%] leading-relaxed",
              isDark ? "bg-zinc-800" : "bg-white border border-slate-200"
            )}>
              {welcomeMessage.length > 60
                ? welcomeMessage.slice(0, 60) + "…"
                : welcomeMessage}
            </div>
          </div>

          {/* Action cards */}
          {previewQuestions.length > 0 && (
            <div className="pl-7 space-y-1 pt-1">
              <p className={cn(
                "text-[9px] uppercase tracking-wider font-medium mb-1.5",
                isDark ? "text-zinc-500" : "text-slate-400"
              )}>
                How can I help?
              </p>
              {previewQuestions.map((q, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded-lg border text-[10px] leading-tight",
                    isDark
                      ? "bg-zinc-800 border-zinc-700 text-zinc-300"
                      : "bg-white border-slate-200 text-slate-700"
                  )}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: values.branding.primary_color }}
                  />
                  <span className="flex-1 truncate">{q}</span>
                  <ChevronRight className="w-2.5 h-2.5 text-slate-400 flex-shrink-0" />
                </div>
              ))}
              {questions.filter(q => q.trim()).length > 3 && (
                <p className={cn(
                  "text-[9px] text-center pt-0.5",
                  isDark ? "text-zinc-600" : "text-slate-400"
                )}>
                  +{questions.filter(q => q.trim()).length - 3} more
                </p>
              )}
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className={cn(
          "px-3 py-2 flex items-center gap-2 border-t",
          isDark ? "border-zinc-700 bg-zinc-900" : "border-slate-100 bg-white"
        )}>
          <div className={cn(
            "flex-1 text-xs rounded-lg px-3 py-1.5 truncate",
            isDark ? "bg-zinc-800 text-zinc-400" : "bg-slate-100 text-slate-400"
          )}>
            {placeholder.length > 22 ? placeholder.slice(0, 22) + "…" : placeholder}
          </div>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: values.branding.primary_color }}
          >
            <Send className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Launcher button */}
      <div
        className={cn(
          "absolute bottom-4 w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-105",
          isLeft ? "left-4" : "right-4",
          radius,
        )}
        style={{ backgroundColor: values.branding.primary_color }}
      >
        <Bot className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}