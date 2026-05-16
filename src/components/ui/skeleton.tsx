import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-linear-to-r before:from-transparent before:via-white/60 dark:before:via-white/10 before:to-transparent",
        "before:animate-[shimmer_1.5s_infinite]",
        className
      )}
      {...props}   // ✅ allows style, onClick, etc.
    />
  );
}