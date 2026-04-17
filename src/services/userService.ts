import { api } from "./api";
import { UpdateNameValues } from "@/lib/validations/user";

export const updateName = async (data: UpdateNameValues) => {
  const res = await api.patch("/users/me/name", data);
  return res.data;
};