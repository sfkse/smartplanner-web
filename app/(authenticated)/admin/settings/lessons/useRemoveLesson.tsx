import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Lesson } from "./types";
import { removeLesson } from "../../../api/lessons";

export const useRemoveLesson = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (id: Lesson["idlessons"]) => removeLesson(id),
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

