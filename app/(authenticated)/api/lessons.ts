import { Lesson } from "../(adminPages)/admin/settings/lessons/types";
import api from "./axios";

export const getLessons = async () => {
  const { data } = await api.get("/lessons");
  return data;
};

export const createLesson = async (formState: any) => {
  const { data } = await api.post("/lessons/create", formState);
  return data;
};

export const updateLesson = async (formState: any) => {
  const { data } = await api.put("/lessons/update", formState);
  return data;
};

export const removeLesson = async (idLesson: Lesson["idlessons"]) => {
  const { data } = await api.put("/lessons/remove", { idLesson });
  return data;
};

