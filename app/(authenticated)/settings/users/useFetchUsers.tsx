import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/users";

export const useFetchUsers = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 60,
  });

  const users = data ? data : [];

  return { users, isPending, error };
};

