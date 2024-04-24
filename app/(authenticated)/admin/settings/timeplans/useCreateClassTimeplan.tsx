import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClassTimeplan } from "@/app/(authenticated)/api/timeplans";
import { ClassTimeplan } from "./types";

export const useCreateClassTimeplan = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (classTimePlan: ClassTimeplan) =>
      createClassTimeplan(classTimePlan),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["classTimeplans"] });
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

