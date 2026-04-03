import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Initializing StoreChat...
      </p>
    </div>
  );
}