import { ClassTimeplan } from "../(adminPages)/admin/settings/timeplans/types";
import api from "./axios";

export const getTimeplans = async () => {
  const { data } = await api.get("/timeplans");
  return data;
};

export const createTimeplan = async (timeplan: ClassTimeplan) => {
  const { data } = await api.post("/timeplans/create", timeplan);
  return data;
};

export const getClassTimeplans = async () => {
  const { data } = await api.get("/classtimeplans");
  return data;
};

export const createClassTimeplan = async (timeplan: ClassTimeplan) => {
  const { data } = await api.post("/classtimeplans/create", timeplan);
  return data;
};

export const updateClassTimeplan = async (timeplan: ClassTimeplan) => {
  const { data } = await api.put("/classtimeplans/update", timeplan);
  return data;
};

export const deleteTimeplan = async (
  idClassTimeplan: ClassTimeplan["idclasstimeplans"]
) => {
  const { data } = await api.put("/classtimeplans/remove", { idClassTimeplan });
  return data;
};

export const getSingleClassTimeplans = async (
  idClassTimeplan: ClassTimeplan["idclasstimeplans"]
) => {
  const { data } = await api.get(`/classtimeplans/${idClassTimeplan}`);
  return data;
};

