import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Yearlyplan } from "./types";
import { createYearlyPlan } from "@/app/(authenticated)/api/yearlyPlans";

export const useCreateYearlyPlan = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (formState: Yearlyplan) => createYearlyPlan(formState),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["yearlyPlans"] });
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

