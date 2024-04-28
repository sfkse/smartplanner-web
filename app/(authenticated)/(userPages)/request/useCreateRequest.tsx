import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequest } from "../../api/requests";
import { Draggable } from "./types";

export const useCreateRequest = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (data: Draggable) => createRequest(data),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["requests"] });
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

