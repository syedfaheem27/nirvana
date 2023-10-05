import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGetBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  //Prefetching the next page for better user experience
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  //Prefetching the previous page for better user experience
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}
