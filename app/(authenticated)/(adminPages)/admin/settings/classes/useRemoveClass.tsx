import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeClass } from "@/app/(authenticated)/api/classes";
import { Class } from "./types";

export const useRemoveClass = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (id: Class["idclasses"]) => removeClass(id),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["classes"] });
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

