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

  //Pagination - server side
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, bookings, error, count };
}
