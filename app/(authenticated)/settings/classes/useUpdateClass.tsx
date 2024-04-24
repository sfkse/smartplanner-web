import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClass } from "@/app/(authenticated)/api/classes";
import { Class } from "./types";

export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (formState: Class) => updateClass(formState),
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

