import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClass } from "@/app/(authenticated)/api/classes";
import { Yearlyplan } from "./types";
import { updateYearlyPlans } from "@/app/(authenticated)/api/yearlyPlans";

export const useUpdateYearlyPlans = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (formState: Yearlyplan) => updateYearlyPlans(formState),
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

