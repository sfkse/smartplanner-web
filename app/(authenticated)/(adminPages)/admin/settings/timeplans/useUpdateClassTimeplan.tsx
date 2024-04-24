import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClassTimeplan } from "@/app/(authenticated)/api/timeplans";
import { ClassTimeplan } from "./types";
import { toast } from "react-toastify";

export const useUpdateClassTimeplan = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (classTimeplan: ClassTimeplan) =>
      updateClassTimeplan(classTimeplan),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["classTimeplans"] });
        queryClient.invalidateQueries({ queryKey: ["singleClassTimeplans"] });
      }
    },
    onSettled: () => {
      // reset();
    },
    onError: (error: any) => {
      toast.error("Något gick fel: " + error.message);
      reset();
    },
  });

  return { mutate, isPending, error, isSuccess };
};

