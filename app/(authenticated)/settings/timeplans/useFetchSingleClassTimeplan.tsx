import { useQuery } from "@tanstack/react-query";
import { getSingleClassTimeplans } from "../../api/timeplans";
import { ClassTimeplan } from "./types";

export const useFetchSingleClassTimeplans = (
  idClassTimeplan: ClassTimeplan["idclasstimeplans"]
) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["singleClassTimeplans", idClassTimeplan],
    queryFn: () => getSingleClassTimeplans(idClassTimeplan),
    staleTime: 1000 * 60 * 60,
  });

  const singleClassTimeplans = data ? data : [];

  return { singleClassTimeplans, isPending, error };
};

