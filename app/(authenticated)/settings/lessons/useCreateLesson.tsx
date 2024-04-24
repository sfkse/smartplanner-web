import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClass } from "@/app/(authenticated)/api/classes";
import { createLesson } from "@/app/(authenticated)/api/lessons";
import { Lesson } from "./types";

type FormState = {
  name: string;
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  const { mutate, error, data, isPending, reset } = useMutation({
    mutationFn: (formState: Lesson) => createLesson(formState),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["lessons"] });
      }
    },
    onSettled: () => console.log("settle"),
    onError: (error: any) => {
      console.log(error);
      reset();
    },
  });

  return { mutate, isPending, error };
};

