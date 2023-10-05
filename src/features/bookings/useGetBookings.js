import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {
  const [searchParams] = useSearchParams();

  //Filter
  const filter =
    searchParams.get("status") === "all" || !searchParams.get("status")
      ? null
      : {
          field: "status",
          value: searchParams.get("status"),
        };

  //Sort
  const sortByQueryParam = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByQueryParam.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, bookings, error };
}
