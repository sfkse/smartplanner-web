import { useQuery } from "@tanstack/react-query";
import { getRequests } from "@/app/(authenticated)/api/requests";
import { getYearlyPlans } from "@/app/(authenticated)/api/yearlyPlans";

export const useFetchYearlyPlans = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["yearlyPlans"],
    queryFn: getYearlyPlans,
    staleTime: 1000 * 60 * 60,
  });

  const yearlyPlans = data ? data : [];

  return { yearlyPlans, isPending, error };
};

