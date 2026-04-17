"use client";

import { AnimatePresence, motion } from "framer-motion";

import { RegistrationStepper } from "./RegistrationStepper";
import { AccountStep } from "./AccountStep";
import { StoreStep } from "./StoreStep";
import { useRegistration } from "@/hooks/useRegistration";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};
 
export function RegisterForm() {
  const { step, 
    isLoading, 
    error, 
    submitAccount, 
    submitStore, 
    goBack,
    storeData,
    accountData } =
    useRegistration();

  const direction = step === 2 ? 1 : -1;

  return (
    <div className="w-full">
      <RegistrationStepper currentStep={step} />

      {/* Step header */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`header-${step}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="mb-6"
        >
          {step === 1 ? (
            <>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Create your account
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Start by setting up your personal login details.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Connect your store
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Link your WooCommerce store to enable AI-powered support.
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Form step */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`step-${step}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          {step === 1 ? (
            <AccountStep
              defaultValues={accountData}
              onSubmit={submitAccount}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <StoreStep
              defaultValues={storeData}
              onSubmit={submitStore}
              onBack={goBack}
              isLoading={isLoading}
              error={error}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-primary hover:underline underline-offset-4"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
