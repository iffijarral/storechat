export interface OnboardingStep {
  key:       string;
  label:     string;
  done:      boolean;
  status:      string | null;
  status_text?: string | null;
  cta_label: string | null;
  cta_path:  string | null;
  cta_action: string | null; // "navigate" | "reingest"
}
 
export interface OnboardingStatus {
  all_done: boolean;
  steps:    OnboardingStep[];
  progress: number;
}