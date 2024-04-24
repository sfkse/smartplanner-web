import { signIn } from "@/app/(authenticated)/api/auth";
import { User } from "@/app/(authenticated)/(adminPages)/admin/settings/users/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormState = {
  email: string;
  password: string;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, error, data, isPending, reset } = useMutation({
    mutationFn: (formState: FormState) => signIn(formState),
    onSuccess: async (data) => {
      if (data) {
        return router.push("/plan/overview");
      }
    },
    onSettled: () => console.log("settle"),
    onError: (error: any) => {
      console.log(error);
      if (error && error.response.status === 401)
        toast.error("Invalid email or password");

      if (error && error.response.status === 500) toast.error("Server error");

      reset();
    },
  });

  return { mutate, data, error, isPending };
};

