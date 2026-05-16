"use client";

import { cn } from "@/lib/utils";
import { passwordRules } from "@/lib/passwordRules";
import { getPasswordStrength } from "@/lib/passwordStrength";

type Props = {
  password: string;
};

export function PasswordStrength({ password }: Props) {
  const { strength, checks } = getPasswordStrength(password);

  const strengthColor =
    strength === "strong"
      ? "bg-green-500"
      : strength === "medium"
      ? "bg-yellow-500"
      : "bg-red-500";

  const strengthWidth =
    strength === "strong"
      ? "w-full"
      : strength === "medium"
      ? "w-2/3"
      : "w-1/3";

  return (
    <div className="space-y-3">
      {/* Strength bar */}
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all", strengthColor, strengthWidth)}
        />
      </div>

      {/* Label */}
      <p className="text-sm capitalize text-muted-foreground">
        Strength: {strength}
      </p>

      {/* Rules checklist */}
      <ul className="space-y-1 text-sm">
        {passwordRules.map((rule, index) => {
          const passed = checks[index];

          return (
            <li
              key={rule.label}
              className={cn(
                "flex items-center gap-2",
                passed ? "text-green-600" : "text-muted-foreground"
              )}
            >
              <span>{passed ? "✔" : "✖"}</span>
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}