import { ExternalLink, Zap } from "lucide-react";
 
const INSTRUCTIONS = [
  {
    title:  "Upload the plugin",
    detail: "In WordPress Admin go to Plugins → Add New → Upload Plugin → choose storechat.zip → Install Now.",
  },
  {
    title:  "Activate the plugin",
    detail: "After installation click Activate Plugin. StoreChat will appear in the left sidebar.",
  },
  {
    title:  "Connect your store",
    detail: "Go to StoreChat in the sidebar → paste your API key from Step 2 → click Connect Store.",
  },
  {
    title:  "Verify connection",
    detail: "Return here and refresh. The Widget Installed step in your onboarding checklist will update automatically.",
  },
];
 
export function WordPressStep() {
  return (
    <div className="space-y-4">
      {INSTRUCTIONS.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[10px] font-bold text-slate-500">{i + 1}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {item.title}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              {item.detail}
            </p>
          </div>
        </div>
      ))}

      {/* ── Optional MCP section ── */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 rounded-xl">
        <Zap className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
            Optional: Enable Advanced Features
          </p>
          <p className="text-[11px] text-blue-600 dark:text-blue-300 leading-relaxed">
            For real-time order tracking and live stock checking, enable WooCommerce MCP
            in your WordPress admin under{" "}
            <strong>WooCommerce → Settings → Features → WooCommerce MCP</strong>.
          </p>
          <p className="text-[11px] text-blue-500 dark:text-blue-400 mt-1">
            Without this, your AI assistant still handles product discovery and FAQ perfectly.
            Order tracking will use the standard WooCommerce API as a fallback.
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <a
          href="https://docs.storechat.io/plugin-setup"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline" >      
          <ExternalLink className="w-3.5 h-3.5" />
          View full documentation with screenshots
        </a>
      </div>
    </div>
  );
}