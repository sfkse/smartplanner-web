import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Yearlyplan } from "./types";
import { removeYearlyPlans } from "@/app/(authenticated)/api/yearlyPlans";

export const useRemoveYearlyPlan = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (id: Yearlyplan["idyearlyplans"]) => removeYearlyPlans(id),
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

