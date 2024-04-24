import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTimeplan } from "@/app/(authenticated)/api/timeplans";
import { ClassTimeplan } from "./types";

type FormState = {
  name: string;
};

export const useCreateTimeplan = () => {
  const queryClient = useQueryClient();

  const { mutate, error, data, isPending, reset } = useMutation({
    mutationFn: (formState: ClassTimeplan) => createTimeplan(formState),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["timeplans"] });
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

