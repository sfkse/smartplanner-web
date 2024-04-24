import { Class } from "../(adminPages)/admin/settings/classes/types";
import api from "./axios";

export const getClasses = async () => {
  const { data } = await api.get("/classes");
  return data;
};

export const createClass = async (formState: any) => {
  const { data } = await api.post("/classes/create", formState);
  return data;
};

export const updateClass = async (formState: any) => {
  const { data } = await api.put("/classes/update", formState);
  return data;
};

export const removeClass = async (idClasses: Class["idclasses"]) => {
  const { data } = await api.put("/classes/remove", { idClasses });
  return data;
};

