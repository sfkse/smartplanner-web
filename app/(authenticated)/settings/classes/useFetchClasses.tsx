import { useQuery } from "@tanstack/react-query";
import { getClasses } from "@/app/(authenticated)/api/classes";

export const useFetchClasses = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
    staleTime: 1000 * 60 * 60,
  });

  const classes = data ? data : [];

  return { classes, isPending, error };
};

