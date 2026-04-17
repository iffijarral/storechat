import { StoreConfigValues } from "@/lib/validations/storeConfig";

export function LivePreview({ values }: { values: StoreConfigValues }) {
  return (
    <div className="relative min-h-125 border-2 border-dashed rounded-xl bg-slate-50 dark:bg-zinc-900/50 flex items-center justify-center p-8">
      <div className="absolute top-4 left-4 text-xs font-mono uppercase text-muted-foreground">Live Preview</div>
      <div className={`w-72 shadow-2xl rounded-2xl overflow-hidden border ${values.ui.theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}>
        <div className="p-4 flex items-center gap-3 text-white" style={{ backgroundColor: values.branding.primary_color }}>
          <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
          <span className="font-semibold">{values.branding.bot_name}</span>
        </div>
        <div className="h-40 p-4 bg-transparent">
           <p className="text-xs opacity-50">Previewing {values.ui.position} position...</p>
        </div>
      </div>
    </div>
  );
}