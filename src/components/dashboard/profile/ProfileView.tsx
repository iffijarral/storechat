"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, EyeOff, Loader2, User, Key, Save } from "lucide-react";
import { toast } from "sonner";
import { useUpdateName } from "@/hooks/user/useUpdateName";

export function ProfileView() {
  const { user } = useAuthStore();
  
  // States
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [showCurrent, setShowCurrent] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Initials for Avatar
  const initials = fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  // Mutations (Stubs)
  const updateNameMutation = useUpdateName();

  const updatePasswordMutation = useMutation({
    mutationFn: async () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) throw new Error("Passwords mismatch");
      await new Promise((r) => setTimeout(r, 800)); // API logic here
    },
    onSuccess: () => {
      toast.success("Password updated");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your public profile and security preferences.</p>
      </div>

      <div className="grid gap-8">
        {/* ─── Profile Section ─── */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            {/* <Avatar className="w-16 h-16 border-2 border-violet-100 dark:border-violet-900">
              <AvatarFallback className="bg-violet-600 text-white text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar> */}
            <div>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>This is how other admins will see your name.</CardDescription>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input 
                    id="name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    className="pl-10"
                  />
                </div>
              </div>
              <Button 
                onClick={() => updateNameMutation.mutate({ name: fullName })}
                disabled={updateNameMutation.isPending || fullName === user?.name}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {updateNameMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ─── Security Section ─── */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-violet-600" />
              <CardTitle>Password</CardTitle>
            </div>
            <CardDescription>Change your password to keep your account secure.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="space-y-6 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="current" 
                    type={showCurrent ? "text" : "password"} 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  />
                  <button 
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input 
                    id="new" 
                    type="password" 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New</Label>
                  <Input 
                    id="confirm" 
                    type="password" 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                onClick={() => updatePasswordMutation.mutate()}
                disabled={updatePasswordMutation.isPending || !passwordForm.newPassword}
                variant="outline"
                className="border-violet-200 hover:bg-violet-50 dark:hover:bg-violet-950"
              >
                {updatePasswordMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}