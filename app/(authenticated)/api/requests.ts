import api from "./axios";

export const getRequests = async () => {
  const { data } = await api.get("/requests");
  return data;
};

export const createRequest = async (requestData) => {
  const { data } = await api.post("/requests/create", requestData);
  return data;
};

