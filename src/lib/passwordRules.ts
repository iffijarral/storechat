// lib/passwordRules.ts

export const passwordRules = [
  {
    label: "At least 10 characters",
    test: (val: string) => val.length >= 10,
  },
  {
    label: "At least one uppercase letter",
    test: (val: string) => /[A-Z]/.test(val),
  },
  {
    label: "At least one number",
    test: (val: string) => /[0-9]/.test(val),
  },
  {
    label: "At least one symbol",
    test: (val: string) => /[^A-Za-z0-9]/.test(val),
  },
];