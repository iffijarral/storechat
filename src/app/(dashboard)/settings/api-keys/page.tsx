import { APIKeysSection } from "@/components/dashboard/settings/APIKeysSection";

export default function APIKeysPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">API Keys</h1>
      <APIKeysSection />
    </div>
  );
}