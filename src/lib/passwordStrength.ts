import { passwordRules } from "./passwordRules";

export function getPasswordStrength(password: string) {
  const results = passwordRules.map((rule) => rule.test(password));
  const passed = results.filter(Boolean).length;

  let strength = "weak";
  if (passed >= 4) strength = "strong";
  else if (passed >= 2) strength = "medium";

  return {
    strength,
    passed,
    total: passwordRules.length,
    checks: results,
  };
}