import { useQuery } from "@tanstack/react-query";
import { getLessons } from "@/app/(authenticated)/api/lessons";

export const useFetchLessons = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["lessons"],
    queryFn: getLessons,
    staleTime: 1000 * 60 * 60,
  });

  const lessons = data ? data : [];

  return { lessons, isPending, error };
};

