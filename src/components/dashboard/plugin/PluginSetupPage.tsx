"use client";
 
import { Download, Key, Upload, ExternalLink } from "lucide-react";
import { StepCard }      from "@/components/dashboard/plugin/StepCard";
import { DownloadStep }  from "@/components/dashboard/plugin/steps/DownloadStep";
import { ApiKeyStep }    from "@/components/dashboard/plugin/steps/ApiKeyStep";
import { WordPressStep } from "@/components/dashboard/plugin/steps/WordPressStep";
 
export function PluginSetupPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
 
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Install the Plugin
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Connect StoreChat to your WooCommerce store in three steps.
        </p>
      </div>
 
      {/* Steps */}
      <div className="space-y-4">
        <StepCard
          number={1}
          icon={Download}
          title="Download the plugin"
          description="Download the StoreChat plugin zip file to your computer."
          defaultOpen
        >
          <DownloadStep />
        </StepCard>
 
        <StepCard
          number={2}
          icon={Key}
          title="Generate your API key"
          description="Create an API key — you will paste this into the plugin settings."
        >
          <ApiKeyStep />
        </StepCard>
 
        <StepCard
          number={3}
          icon={Upload}
          title="Install & connect in WordPress"
          description="Upload the plugin, activate it, and paste your API key."
        >
          <WordPressStep />
        </StepCard>
      </div>
 
      {/* Help footer */}
      <div className="flex items-center gap-2 text-xs text-slate-400 pb-8">
        <span>Need help?</span>
        <a
          href="https://docs.storechat.io/plugin-setup"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline font-medium"
        >
          View full documentation
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}