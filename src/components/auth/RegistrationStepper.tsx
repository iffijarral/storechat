import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RegistrationStep } from "@/hooks/useRegistration";

interface Step {
  number: RegistrationStep;
  label: string;
  description: string;
}

const STEPS: Step[] = [
  { number: 1, label: "Your Account", description: "Personal details" },
  { number: 2, label: "Your Store", description: "WooCommerce setup" },
];

interface RegistrationStepperProps {
  currentStep: RegistrationStep;
}

export function RegistrationStepper({ currentStep }: RegistrationStepperProps) {
  return (
    <nav aria-label="Registration progress" className="mb-8">
      <ol className="flex items-center">
        {STEPS.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          const isLast = index === STEPS.length - 1;

          return (
            <li key={step.number} className={cn("flex items-center", !isLast && "flex-1")}>
              {/* Circle + label */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    isActive &&
                      "border-primary bg-background text-primary shadow-sm shadow-primary/20",
                    !isCompleted &&
                      !isActive &&
                      "border-muted-foreground/30 bg-background text-muted-foreground"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    step.number
                  )}
                </div>

                <div className="hidden sm:block">
                  <p
                    className={cn(
                      "text-sm font-medium leading-none",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "mx-4 h-0.5 flex-1 rounded-full transition-all duration-500",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
