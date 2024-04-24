import api from "@/app/(authenticated)/api/axios";

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const createUser = async (formState: any) => {
  const { data } = await api.post("/users", formState);
  return data;
};
