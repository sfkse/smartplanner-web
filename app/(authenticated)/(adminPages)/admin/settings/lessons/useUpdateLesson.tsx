import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClass } from "@/app/(authenticated)/api/classes";
import { Lesson } from "./types";
import { updateLesson } from "../../../../api/lessons";

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (formState: Lesson) => updateLesson(formState),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["lessons"] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
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

