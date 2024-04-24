import { useQuery } from "@tanstack/react-query";
import { getLessons } from "@/app/(authenticated)/api/lessons";
import { getTimeplans } from "../../../../api/timeplans";

export const useFetchTimeplans = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["timeplans"],
    queryFn: getTimeplans,
    staleTime: 1000 * 60 * 60,
  });

  const timeplans = data ? data : [];

  return { timeplans, isPending, error };
};

