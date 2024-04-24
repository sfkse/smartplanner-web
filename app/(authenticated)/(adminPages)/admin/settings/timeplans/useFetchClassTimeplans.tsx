import { useQuery } from "@tanstack/react-query";
import { getClassTimeplans } from "../../../../api/timeplans";

export const useFetchClassTimeplans = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["classTimeplans"],
    queryFn: getClassTimeplans,
    staleTime: 1000 * 60 * 60,
  });

  const classTimeplans = data ? data : [];

  return { classTimeplans, isPending, error };
};

