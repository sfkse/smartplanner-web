import { ClassTimeplan } from "../(adminPages)/admin/settings/timeplans/types";
import api from "./axios";

export const getRequests = async () => {
  const { data } = await api.get("/requests");
  return data;
};

