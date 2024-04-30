import { Yearlyplan } from "../(adminPages)/admin/plan/overview/types";
import api from "./axios";

export const getYearlyPlans = async () => {
  const { data } = await api.get("/yearlyplans");
  return data;
};

export const createYearlyPlan = async (yearlyPlanData: Yearlyplan) => {
  console.log(yearlyPlanData);
  const { data } = await api.post("/yearlyplans/create", yearlyPlanData);
  return data;
};

export const updateYearlyPlans = async (formState: any) => {
  const { data } = await api.put("/yearlyplans/update", formState);
  return data;
};

export const removeYearlyPlans = async (
  idyearlyplans: Yearlyplan["idyearlyplans"]
) => {
  const { data } = await api.put("/yearlyplans/remove", { idyearlyplans });
  return data;
};

export const getSingleYearlyplan = async (
  idyearlyplans: Yearlyplan["idyearlyplans"]
) => {
  const { data } = await api.get(`/yearlyplans/${idyearlyplans}`);
  return data;
};
