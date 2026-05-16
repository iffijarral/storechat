"use client";
 
import { useState } from "react";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
 
interface StepCardProps {
  number:      number;
  icon:        LucideIcon;
  title:       string;
  description: string;
  defaultOpen?: boolean;
  children:    React.ReactNode;
}
 
export function StepCard({
  number,
  icon: Icon,
  title,
  description,
  defaultOpen = false,
  children,
}: StepCardProps) {
  const [open, setOpen] = useState(defaultOpen);
 
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
 
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors text-left"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
 
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Step {number}
          </span>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {description}
          </p>
        </div>
 
        <ChevronRight className={cn(
          "w-4 h-4 text-slate-400 transition-transform shrink-0",
          open && "rotate-90",
        )} />
      </button>
 
      {open && (
        <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-5">
          {children}
        </div>
      )}
    </div>
  );
}