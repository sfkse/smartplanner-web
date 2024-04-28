import { useQuery } from "@tanstack/react-query";
import { getRequests } from "@/app/(authenticated)/api/requests";
import { Request } from "@/app/(authenticated)/types/requests";

export const useFetchRequests = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
    staleTime: 1000 * 60 * 60,
  });

  const requests = data ? data : [];

  return { requests, isPending, error };
};

