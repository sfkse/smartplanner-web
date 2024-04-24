import { headers } from "next/headers";
import api from "./axios";
import { User } from "../admin/settings/users/types";
// import  } from "../types/form";

type FormData = {
  email: string;
  password: string;
};

export const signIn = async (formData: FormData) => {
  const { data } = await api.post("/auth/login", formData);
  return data;
};

export const getLoggedInStatus = async () => {
  const { data } = await api.get("/auth/authuser");
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post(`/auth/logout`);
  return data;
};

