import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTimeplan,
  deleteTimeplan,
} from "@/app/(authenticated)/api/timeplans";
import { ClassTimeplan } from "./types";
import { toast } from "react-toastify";

type FormState = {
  name: string;
};

export const useRemoveTimeplan = () => {
  const queryClient = useQueryClient();

  const { mutate, error, data, isPending, reset } = useMutation({
    mutationFn: (idTimeplan: ClassTimeplan["idclasstimeplans"]) =>
      deleteTimeplan(idTimeplan),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["classTimeplans"] });
      }
    },
    onSettled: () => console.log("settle"),
    onError: (error: any) => {
      toast.error("Något gick fel: " + error.message);
      reset();
    },
  });

  return { mutate, isPending, error };
};

