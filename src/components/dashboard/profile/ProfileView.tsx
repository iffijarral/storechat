"use client";

// components/dashboard/ProfileView.tsx

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, User, Key, Mail, CheckCircle2 } from "lucide-react";
import { useUpdateName } from "@/hooks/user/useUpdateName";
import ChangePasswordForm from "@/components/auth/ChangePassword";

export function ProfileView() {
  const { user } = useAuthStore();
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [nameSaved, setNameSaved] = useState(false); 

  const updateNameMutation = useUpdateName();

  const handleSaveName = () => {
    updateNameMutation.mutate(
      { name: fullName },
      {
        onSuccess: () => {
          setNameSaved(true);
          setTimeout(() => setNameSaved(false), 3000);
        },
      },
    );
  };

  const nameUnchanged = fullName.trim() === (user?.name ?? "").trim();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your profile and security preferences.
        </p>
      </div>

      <div className="grid gap-6">

        {/* ── Profile Card ── */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Public Profile</CardTitle>
            <CardDescription>
              This is how other admins will identify you.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-4">

            {/* Email — read only */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  value={user?.email ?? ""}
                  readOnly
                  className="pl-10 bg-slate-50 dark:bg-slate-900 text-slate-500 cursor-not-allowed"
                />
              </div>
              <p className="text-[11px] text-slate-400">Email cannot be changed.</p>
            </div>

            {/* Full name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setNameSaved(false);
                  }}
                  className="pl-10"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Save button + inline success */}
            <div className="flex items-center gap-3 pt-1">
              <Button
                onClick={handleSaveName}
                disabled={updateNameMutation.isPending || nameUnchanged}
                className="w-full sm:w-auto"
              >
                {updateNameMutation.isPending
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…</>
                  : "Save Changes"}
              </Button>

              {nameSaved && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium animate-in fade-in slide-in-from-left-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Saved
                </span>
              )}

              {updateNameMutation.isError && (
                <span className="text-sm text-red-500">
                  Failed to save. Try again.
                </span>
              )}
            </div>

          </CardContent>
        </Card>

        {/* ── Security Card ── */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-slate-500" />
              <CardTitle className="text-base">Password</CardTitle>
            </div>
            <CardDescription>
              After changing your password you will be signed out of all sessions.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <ChangePasswordForm />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}