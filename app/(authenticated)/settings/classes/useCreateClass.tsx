import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClass } from "@/app/(authenticated)/api/classes";
import { Class } from "./types";

type FormState = {
  name: string;
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  const { mutate, error, data, isPending, reset } = useMutation({
    mutationFn: (formState: Class) => createClass(formState),
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

