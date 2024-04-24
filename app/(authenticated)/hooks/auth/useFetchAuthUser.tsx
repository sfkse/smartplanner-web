import { useQuery } from "@tanstack/react-query";

import { getLoggedInStatus } from "../../api/auth";

export const useFetchAuthUser = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getLoggedInStatus,
    staleTime: 1000 * 60 * 5,
  });

  if (error instanceof Error) error;

  return { authUser: data, isPending, error };
};

