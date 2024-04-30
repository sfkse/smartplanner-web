import { useQuery } from "@tanstack/react-query";
import { getSingleClassTimeplans } from "../../../../api/timeplans";
import { Yearlyplan } from "./types";
import { getSingleYearlyplan } from "@/app/(authenticated)/api/yearlyPlans";

export const useFetchSingleYearlyPlan = (
  idyearlyplans: Yearlyplan["idyearlyplans"]
) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["singleYearlyPlan", idyearlyplans],
    queryFn: () => getSingleYearlyplan(idyearlyplans),
    staleTime: 1000 * 60 * 60,
  });

  const singleYearlyplan = data ? data : [];

  return { singleYearlyplan, isPending, error };
};

