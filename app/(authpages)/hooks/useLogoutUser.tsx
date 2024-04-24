import { logoutUser } from "@/app/(authenticated)/api/auth";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogoutUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["authUser"] });
      queryClient.removeQueries({ queryKey: ["users"] });
      queryClient.removeQueries({ queryKey: ["classes"] });
      queryClient.removeQueries({ queryKey: ["lessons"] });
      localStorage.clear();
      return router.replace("/login");
    },
  });

  return { mutate, data, error, isPending };
};

