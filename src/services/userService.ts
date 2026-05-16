import { api } from "./api";
import { UpdateNameValues } from "@/lib/validations/user";
import { PasswordChangeValues } from "@/lib/validations/auth";
import { ForgotPasswordRequest, ResetPasswordRequest } from "@/types/auth";

export const updateName = async (data: UpdateNameValues) => {
  const res = await api.patch("/users/me/name", data);
  return res.data;
};

export const changePassword = async (data: PasswordChangeValues) => {
  const res = await api.post("/auth/change-password", data);
  return res.data;
};

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  return await api.post("/auth/forgot-password", data);
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  return await api.post("/auth/reset-password", data);
}