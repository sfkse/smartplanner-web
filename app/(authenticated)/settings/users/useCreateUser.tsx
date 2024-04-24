import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClass } from "@/app/(authenticated)/api/classes";
import { createLesson } from "@/app/(authenticated)/api/lessons";
import { createUser } from "../../api/users";
import { User } from "./types";

type FormState = {
  name: string;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: (formState: User) => createUser(formState),
    onSuccess: async (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
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

